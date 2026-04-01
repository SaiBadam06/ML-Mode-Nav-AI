from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
import json
from services.groq_client import chat_completion
from services.knowledge_base import PREPROCESSING

router = APIRouter()


class PreprocessingRequest(BaseModel):
    problem: str
    problem_type: str
    dataset_info: Optional[str] = ""


@router.post("/preprocessing")
async def get_preprocessing(req: PreprocessingRequest):
    base_steps = PREPROCESSING.get(req.problem_type, PREPROCESSING["Classification"])

    prompt = f"""You are an expert ML engineer. Generate a complete Python preprocessing pipeline for:

Problem: {req.problem}
Problem Type: {req.problem_type}
Dataset Info: {req.dataset_info or "Generic tabular dataset"}

Write production-quality Python code using scikit-learn Pipeline. Include:
- Imports
- Column definitions (use placeholder names like 'numeric_features', 'categorical_features')
- ColumnTransformer for preprocessing
- Pipeline construction

Return ONLY valid JSON:
{{
  "code": "<complete Python code as a single string with \\n for newlines>"
}}"""

    content = chat_completion(
        [{"role": "user", "content": prompt}],
        temperature=0.4,
        max_tokens=1024
    )

    try:
        start = content.find("{")
        end = content.rfind("}") + 1
        result = json.loads(content[start:end])
        code = result.get("code", "")
    except Exception:
        code = _fallback_code(req.problem_type)

    return {
        "steps": base_steps,
        "code": code
    }


def _fallback_code(problem_type: str) -> str:
    return """import pandas as pd
import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.compose import ColumnTransformer

# Define feature groups
numeric_features = ['feature1', 'feature2', 'feature3']
categorical_features = ['cat_feature1', 'cat_feature2']

# Numeric pipeline
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# Categorical pipeline
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('onehot', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# Combine preprocessing
preprocessor = ColumnTransformer(transformers=[
    ('num', numeric_transformer, numeric_features),
    ('cat', categorical_transformer, categorical_features)
])

# Final pipeline
pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor)
])

# Fit and transform
X_train_transformed = pipeline.fit_transform(X_train)
X_test_transformed = pipeline.transform(X_test)
"""

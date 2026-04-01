"""
Static knowledge base: problem_type → algorithms, datasets, metrics, preprocessing.
Acts as the ground-truth layer that the AI enriches.
"""

PROBLEM_TYPES = [
    "Classification",
    "Regression",
    "Clustering",
    "NLP",
    "Computer Vision",
    "Time Series",
]

ALGORITHMS = {
    "Classification": {
        "beginner": [
            {"name": "Logistic Regression", "description": "Fast, interpretable linear classifier", "pros": ["Simple", "Explainable", "Fast"], "cons": ["Linear boundary only", "Sensitive to outliers"]},
            {"name": "Decision Tree", "description": "Tree-based rule learner", "pros": ["Interpretable", "No scaling needed"], "cons": ["Overfits easily", "Unstable"]},
            {"name": "k-Nearest Neighbors", "description": "Instance-based learner", "pros": ["No training phase", "Simple"], "cons": ["Slow at prediction", "Sensitive to scale"]},
        ],
        "advanced": [
            {"name": "Random Forest", "description": "Ensemble of decision trees", "pros": ["Robust", "Handles missing values", "Feature importance"], "cons": ["Slower", "Less interpretable"]},
            {"name": "XGBoost", "description": "Gradient boosting powerhouse", "pros": ["Top Kaggle performer", "Handles imbalance"], "cons": ["Many hyperparameters", "Slower to tune"]},
            {"name": "SVM", "description": "Margin-based classifier", "pros": ["Effective in high dimensions", "Kernel trick"], "cons": ["Slow on large data", "Hard to tune"]},
            {"name": "LightGBM", "description": "Fast gradient boosting", "pros": ["Very fast", "Low memory"], "cons": ["Can overfit small data"]},
        ],
    },
    "Regression": {
        "beginner": [
            {"name": "Linear Regression", "description": "Simplest regression baseline", "pros": ["Interpretable", "Fast"], "cons": ["Assumes linearity"]},
            {"name": "Ridge Regression", "description": "L2-regularized linear regression", "pros": ["Handles multicollinearity"], "cons": ["Still linear"]},
        ],
        "advanced": [
            {"name": "Random Forest Regressor", "description": "Ensemble for regression", "pros": ["Non-linear", "Robust"], "cons": ["Less interpretable"]},
            {"name": "XGBoost Regressor", "description": "GBDT for regression", "pros": ["High accuracy", "Feature importance"], "cons": ["Needs tuning"]},
            {"name": "SVR", "description": "Support Vector Regressor", "pros": ["Effective in high dims"], "cons": ["Slow on large data"]},
        ],
    },
    "Clustering": {
        "beginner": [
            {"name": "K-Means", "description": "Centroid-based clustering", "pros": ["Simple", "Fast"], "cons": ["Need to specify K", "Assumes spherical clusters"]},
        ],
        "advanced": [
            {"name": "DBSCAN", "description": "Density-based clustering", "pros": ["Finds arbitrary shapes", "Detects outliers"], "cons": ["Sensitive to eps param"]},
            {"name": "Hierarchical Clustering", "description": "Tree-based cluster merging", "pros": ["No K needed", "Dendrogram"], "cons": ["Slow on large data"]},
            {"name": "Gaussian Mixture Models", "description": "Probabilistic soft clustering", "pros": ["Soft assignments", "Flexible shapes"], "cons": ["Needs tuning"]},
        ],
    },
    "NLP": {
        "beginner": [
            {"name": "TF-IDF + Logistic Regression", "description": "Classic text classification", "pros": ["Simple", "Fast"], "cons": ["No semantics"]},
            {"name": "Naive Bayes", "description": "Probabilistic text classifier", "pros": ["Very fast", "Works well with little data"], "cons": ["Conditional independence assumption"]},
        ],
        "advanced": [
            {"name": "BERT", "description": "Transformer-based language model", "pros": ["State-of-the-art", "Contextual embeddings"], "cons": ["Resource intensive", "Needs fine-tuning"]},
            {"name": "RoBERTa", "description": "Optimized BERT training", "pros": ["Better than BERT", "Robust"], "cons": ["Large model size"]},
            {"name": "LSTM", "description": "Sequence-based RNN", "pros": ["Handles sequential data"], "cons": ["Slower than transformers"]},
        ],
    },
    "Computer Vision": {
        "beginner": [
            {"name": "CNN (Custom)", "description": "Convolutional Neural Network", "pros": ["Spatial feature learning"], "cons": ["Needs much data"]},
        ],
        "advanced": [
            {"name": "ResNet-50", "description": "Deep residual network", "pros": ["Transfer learning ready", "Deep but trainable"], "cons": ["Large model"]},
            {"name": "EfficientNet", "description": "Scalable CNN architecture", "pros": ["Best accuracy/compute trade-off"], "cons": ["Complex scaling"]},
            {"name": "ViT", "description": "Vision Transformer", "pros": ["SOTA on ImageNet", "Attention-based"], "cons": ["Needs large data"]},
            {"name": "YOLOv8", "description": "Real-time object detection", "pros": ["Fast inference", "Accurate"], "cons": ["Detection-only"]},
        ],
    },
    "Time Series": {
        "beginner": [
            {"name": "ARIMA", "description": "Classic statistical forecasting", "pros": ["Simple", "Interpretable"], "cons": ["Linear only"]},
            {"name": "Exponential Smoothing", "description": "Weighted historical average", "pros": ["Simple", "Fast"], "cons": ["No complex patterns"]},
        ],
        "advanced": [
            {"name": "LSTM", "description": "Recurrent net for sequences", "pros": ["Long-term dependencies"], "cons": ["Needs much data"]},
            {"name": "Prophet", "description": "Facebook's forecasting library", "pros": ["Handles seasonality", "Easy API"], "cons": ["Not for all patterns"]},
            {"name": "Transformer (Temporal Fusion)", "description": "Attention for time series", "pros": ["SOTA forecasting"], "cons": ["Complex architecture"]},
        ],
    },
}

DATASETS = {
    "Classification": [
        {"name": "Titanic — Survival Prediction", "description": "Binary classification on passenger survival", "size": "891 rows", "link": "https://www.kaggle.com/c/titanic"},
        {"name": "Credit Card Fraud Detection", "description": "Highly imbalanced binary classification", "size": "284K rows", "link": "https://www.kaggle.com/mlg-ulb/creditcardfraud"},
        {"name": "Heart Disease UCI", "description": "Medical classification dataset", "size": "303 rows", "link": "https://archive.ics.uci.edu/ml/datasets/heart+Disease"},
        {"name": "MNIST Digits", "description": "Handwritten digit image classification", "size": "70K images", "link": "https://www.kaggle.com/c/digit-recognizer"},
    ],
    "Regression": [
        {"name": "House Prices — Advanced Regression", "description": "Predict house sale prices with 79 features", "size": "1.4K rows", "link": "https://www.kaggle.com/c/house-prices-advanced-regression-techniques"},
        {"name": "Boston Housing", "description": "Classic housing price prediction", "size": "506 rows", "link": "https://archive.ics.uci.edu/ml/machine-learning-databases/housing/"},
        {"name": "Bike Sharing Demand", "description": "Hourly bike rental count prediction", "size": "17K rows", "link": "https://www.kaggle.com/c/bike-sharing-demand"},
    ],
    "Clustering": [
        {"name": "Mall Customer Segmentation", "description": "Customer behaviour clustering", "size": "200 rows", "link": "https://www.kaggle.com/vjchoudhary7/customer-segmentation-tutorial-in-python"},
        {"name": "Wholesale Customers", "description": "Annual spending clustering", "size": "440 rows", "link": "https://archive.ics.uci.edu/ml/datasets/wholesale+customers"},
    ],
    "NLP": [
        {"name": "IMDB Movie Reviews", "description": "Binary sentiment classification", "size": "50K reviews", "link": "https://www.kaggle.com/lakshmi25npathi/imdb-dataset-of-50k-movie-reviews"},
        {"name": "Twitter Sentiment Analysis", "description": "Multi-class tweet sentiment", "size": "1.6M tweets", "link": "https://www.kaggle.com/kazanova/sentiment140"},
        {"name": "AG News Classification", "description": "News topic classification (4 classes)", "size": "120K articles", "link": "https://huggingface.co/datasets/ag_news"},
    ],
    "Computer Vision": [
        {"name": "CIFAR-10", "description": "10-class image classification benchmark", "size": "60K images", "link": "https://www.kaggle.com/c/cifar-10"},
        {"name": "Dogs vs Cats", "description": "Binary image classification", "size": "25K images", "link": "https://www.kaggle.com/c/dogs-vs-cats"},
        {"name": "Intel Image Classification", "description": "6-class scene recognition", "size": "14K images", "link": "https://www.kaggle.com/puneet6060/intel-image-classification"},
    ],
    "Time Series": [
        {"name": "Store Item Demand Forecasting", "description": "5-year daily sales forecast", "size": "913K rows", "link": "https://www.kaggle.com/c/demand-forecasting-kernels-only"},
        {"name": "Air Passengers", "description": "Classic monthly international airline passengers", "size": "144 rows", "link": "https://www.kaggle.com/rakannimer/air-passengers"},
        {"name": "Electricity Load Forecasting", "description": "Hourly power consumption prediction", "size": "140K rows", "link": "https://www.kaggle.com/uciml/electric-power-consumption-data-set"},
    ],
}

METRICS = {
    "Classification": [
        {"name": "Accuracy", "formula": "Correct / Total", "explanation": "Overall correctness. Use when classes are balanced."},
        {"name": "F1 Score", "formula": "2 * (Precision * Recall) / (Precision + Recall)", "explanation": "Harmonic mean of precision/recall. Best for imbalanced classes."},
        {"name": "ROC-AUC", "formula": "Area under ROC curve", "explanation": "Measures model's discrimination ability. Ideal for probabilistic classifiers."},
        {"name": "Precision", "formula": "TP / (TP + FP)", "explanation": "How many predicted positives are truly positive. Critical when false positives are costly."},
        {"name": "Recall", "formula": "TP / (TP + FN)", "explanation": "How many actual positives are caught. Critical when false negatives are costly."},
    ],
    "Regression": [
        {"name": "RMSE", "formula": "√(Σ(y-ŷ)² / n)", "explanation": "Penalizes large errors heavily. Use when outliers matter."},
        {"name": "MAE", "formula": "Σ|y-ŷ| / n", "explanation": "Average absolute error. More robust to outliers than RMSE."},
        {"name": "R² Score", "formula": "1 - SS_res/SS_tot", "explanation": "Proportion of variance explained. 1.0 is perfect."},
        {"name": "MAPE", "formula": "Σ|y-ŷ|/y * 100%", "explanation": "Percentage error. Interpretable across different scales."},
    ],
    "Clustering": [
        {"name": "Silhouette Score", "formula": "(b-a)/max(a,b)", "explanation": "Measures how similar a point is to its cluster vs. other clusters. [-1, 1]; higher is better."},
        {"name": "Davies-Bouldin Index", "formula": "Avg of max(Sᵢ+Sⱼ)/d(cᵢ,cⱼ)", "explanation": "Lower is better. Measures cluster separation quality."},
        {"name": "Inertia (WCSS)", "formula": "Σ ||x - μ||²", "explanation": "Sum of squared distances to cluster centre. Use with elbow method."},
    ],
    "NLP": [
        {"name": "Accuracy", "formula": "Correct / Total", "explanation": "Overall text classification correctness."},
        {"name": "F1 Score (Macro)", "formula": "Mean of per-class F1", "explanation": "Treats all classes equally. Good for multi-class NLP."},
        {"name": "BLEU Score", "formula": "n-gram precision", "explanation": "For text generation/translation quality."},
        {"name": "Perplexity", "formula": "exp(-avg log P)", "explanation": "Language model quality — lower is better."},
    ],
    "Computer Vision": [
        {"name": "Accuracy", "formula": "Correct / Total", "explanation": "Standard image classification metric."},
        {"name": "mAP", "formula": "Mean Average Precision", "explanation": "For object detection models across IoU thresholds."},
        {"name": "IoU", "formula": "Intersection / Union", "explanation": "Measures bounding box overlap quality for detection/segmentation."},
        {"name": "Top-5 Accuracy", "formula": "Correct in top 5 / Total", "explanation": "Used in large-scale vision benchmarks like ImageNet."},
    ],
    "Time Series": [
        {"name": "MAE", "formula": "Σ|y-ŷ| / n", "explanation": "Simple, interpretable average forecast error."},
        {"name": "RMSE", "formula": "√(Σ(y-ŷ)²/n)", "explanation": "Penalizes large forecast errors."},
        {"name": "MAPE", "formula": "Σ|y-ŷ|/y * 100%", "explanation": "Percentage-based — useful for comparing across scales."},
        {"name": "SMAPE", "formula": "2|y-ŷ|/(|y|+|ŷ|) * 100%", "explanation": "Symmetric MAPE, avoids division by zero issue."},
    ],
}

PREPROCESSING = {
    "Classification": [
        "Handle missing values: impute numeric columns with median, categorical with mode",
        "Encode categorical features: LabelEncoder for ordinal, OneHotEncoder for nominal",
        "Scale numeric features: StandardScaler or MinMaxScaler",
        "Handle class imbalance: SMOTE oversampling or class_weight='balanced'",
        "Feature selection: remove low-variance features, apply SelectKBest or RFE",
        "Split data: train/validation/test (70/15/15 or 80/20)",
    ],
    "Regression": [
        "Handle missing values: median imputation for numeric, mode for categorical",
        "Encode categorical features: OneHotEncoder or OrdinalEncoder",
        "Scale features: StandardScaler (important for linear models)",
        "Handle outliers: IQR clipping or log-transform skewed targets",
        "Feature engineering: polynomial features, interaction terms",
        "Split data: train/test (80/20), use TimeSeriesSplit if data has temporal order",
    ],
    "Clustering": [
        "Handle missing values: impute or drop rows with >30% missing",
        "Scale all features: StandardScaler is critical — clustering is distance-based",
        "Dimensionality reduction: PCA to 2-3 components for visualization",
        "Remove outliers: DBSCAN or IQR method before clustering",
        "Encode categoricals: OneHotEncoder, then scale",
        "Determine optimal K: elbow method or silhouette analysis",
    ],
    "NLP": [
        "Lowercasing and punctuation removal",
        "Tokenization: word-level or subword (BPE for transformers)",
        "Stopword removal (for classical ML) — skip for transformers",
        "Stemming/Lemmatization: Porter Stemmer or SpaCy lemmatizer",
        "Vectorization: TF-IDF for classical ML, tokenizer for BERT",
        "Sequence padding/truncation to max_length for transformer models",
    ],
    "Computer Vision": [
        "Resize images to uniform size (e.g., 224×224 for ImageNet models)",
        "Normalize pixel values: divide by 255.0 or use ImageNet mean/std",
        "Data augmentation: random flip, rotation, crop, brightness jitter",
        "Train/val split maintaining class distribution (stratified)",
        "Convert to tensor format (PyTorch) or numpy arrays (TensorFlow)",
        "Apply transfer learning preprocessing matching pretrained model requirements",
    ],
    "Time Series": [
        "Check and handle missing timestamps: forward-fill or interpolate",
        "Decompose: trend, seasonality, residual (STL decomposition)",
        "Stationarity test: ADF test, difference if non-stationary",
        "Lag feature engineering: create lag-1, lag-7, rolling mean features",
        "Scale: MinMaxScaler for LSTM, StandardScaler for linear models",
        "Train/test split: chronological — never random split time series data",
    ],
}

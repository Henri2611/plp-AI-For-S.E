import streamlit as st
import numpy as np
import tensorflow as tf
from PIL import Image

# Load the trained model
@st.cache_resource
def load_model():
    model = tf.keras.models.load_model("results/mnist_cnn_model.h5")
    return model

model = load_model()

st.title("🧮 MNIST Digit Classifier")
st.write("Draw or upload a digit (0–9) to predict using your CNN model.")

# Upload image or draw one
uploaded_file = st.file_uploader("Upload a 28x28 grayscale image", type=["png", "jpg", "jpeg"])

if uploaded_file is not None:
    image = Image.open(uploaded_file).convert('L')  # convert to grayscale
    image = image.resize((28, 28))
    st.image(image, caption="Input Image", use_container_width=True)
    
    # Preprocess
    img_array = np.array(image).astype("float32") / 255.0
    img_array = np.expand_dims(img_array, axis=(0, -1))  # shape (1,28,28,1)

    # Predict
    predictions = model.predict(img_array)
    pred_label = np.argmax(predictions)
    confidence = np.max(predictions) * 100

    st.write(f"### 🧠 Predicted Digit: {pred_label}")
    st.write(f"Confidence: {confidence:.2f}%")

else:
    st.info("👆 Upload an image of a handwritten digit to begin.")

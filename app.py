
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import torch
from torchvision import models, transforms
import io

app = Flask(__name__)
CORS(app)

model = models.resnet18(pretrained=True)
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

with open("imagenet_classes.txt") as f:
    labels = [line.strip() for line in f.readlines()]

@app.route("/detect-ingredients", methods=["POST"])
def detect_ingredients():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    img_bytes = file.read()
    image = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    input_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(input_tensor)
    _, indices = torch.topk(outputs, 3)
    predictions = [labels[idx] for idx in indices[0]]

    return jsonify({"ingredients": predictions})

if __name__ == '__main__':
    app.run(debug=True)

document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('imageInput');
    const selectedImage = document.getElementById('selectedImage');
    const textContainer = document.getElementById('textContainer');
    const textInput = document.getElementById('textInput');
    const fontSizeInput = document.getElementById('fontSize');
    const fontColorInput = document.getElementById('fontColor');
    const addTextButton = document.getElementById('addText');
    const downloadButton = document.getElementById('downloadImage');

    let currentImage = null;

    imageInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            selectedImage.src = url;
            currentImage = new Image();
            currentImage.src = url;
        }
    });

    addTextButton.addEventListener('click', function() {
        const text = textInput.value;
        const fontSize = fontSizeInput.value + 'px';
        const fontColor = fontColorInput.value;

        const textElement = document.createElement('div');
        textElement.textContent = text;
        textElement.style.fontSize = fontSize;
        textElement.style.color = fontColor;

        textContainer.appendChild(textElement);
    });

    let isAddingText = false;
            let selectedText = null;
            let offsetX = 0;
            let offsetY = 0;

            selectedImage.addEventListener('click', function(event) {
                if (isAddingText) {
                    const text = textInput.value;
                    const fontSize = fontSizeInput.value + 'px';
                    const fontColor = fontColorInput.value;

                    const textElement = document.createElement('div');
                    textElement.textContent = text;
                    textElement.style.fontSize = fontSize;
                    textElement.style.color = fontColor;
                    textElement.style.position = 'absolute';
                    textElement.style.left = event.offsetX + 'px';
                    textElement.style.top = event.offsetY + 'px';
                    textElement.style.cursor = 'grab';

                    textElement.addEventListener('mousedown', function(e) {
                        selectedText = textElement;
                        offsetX = e.clientX - textElement.getBoundingClientRect().left;
                        offsetY = e.clientY - textElement.getBoundingClientRect().top;
                        textElement.style.cursor = 'grabbing';
                    });

                    textElement.addEventListener('mouseup', function() {
                        selectedText = null;
                        textElement.style.cursor = 'grab';
                    });

                    textContainer.appendChild(textElement);
                }
            });

            document.addEventListener('mousemove', function(event) {
                if (selectedText) {
                    selectedText.style.left = (event.clientX - offsetX) + 'px';
                    selectedText.style.top = (event.clientY - offsetY) + 'px';
                }
            });

            addTextButton.addEventListener('click', function() {
                isAddingText = true;
            });

            textInput.addEventListener('input', function() {
                if (isAddingText) {
                    isAddingText = false;
                }
            });

            

            document.getElementById('downloadImage').addEventListener('click', function() {
                if (currentImage) {
                    const canvas = document.createElement('canvas');
                    canvas.width = currentImage.width;
                    canvas.height = currentImage.height;
            
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(currentImage, 0, 0);
            
                    textContainer.childNodes.forEach(function(textElement) {
                        const fontSize = parseInt(textElement.style.fontSize);
                        const x = parseInt(textElement.style.left);
                        const y = parseInt(textElement.style.top);
                        ctx.font = `${fontSize}px sans-serif`;
                        ctx.fillStyle = textElement.style.color;
                        ctx.fillText(textElement.textContent, x, y);
                    });
            
                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = 'meme.png';
                    link.click();
                }
            });

            const imageSelect = document.getElementById('imageSelect');

imageSelect.addEventListener('change', function() {
    const selectedOption = imageSelect.options[imageSelect.selectedIndex];
    const selectedImageSrc = selectedOption.value;

    if (selectedImageSrc) {
        currentImage = new Image();
        currentImage.src = selectedImageSrc;
        selectedImage.src = selectedImageSrc;
    }
});
            
   
            

});

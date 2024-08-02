document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('toutlesitemdr');
    const contactInfo = document.getElementById('background'); 
    const totalPhotos = 196; 
    const numberOfPhotosToShow = 20; 
    const images = []; 


    const photoIndices = Array.from({ length: totalPhotos }, (_, i) => i + 1);


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }


    shuffle(photoIndices);


    const selectedIndices = photoIndices.slice(0, numberOfPhotosToShow);


    let imagesLoaded = 0;
    selectedIndices.forEach(index => {
        const img = new Image();
        img.src = `images/photo${index}.png`; 
        img.classList.add('image');
        img.onload = function() {
            imagesLoaded++;
            if (imagesLoaded === numberOfPhotosToShow) {
                displayImages();
            }
        };
        images.push(img);
    });


    function createImageContainer(image) {
        const div = document.createElement('div');
        div.classList.add('image-container');
        div.style.top = Math.random() * 40 + 'vh';
        div.style.left = Math.random() * 75 + 'vw';

        const closeButton = document.createElement('div');
        closeButton.classList.add('close-button');
        closeButton.textContent = 'X'; 
        closeButton.onclick = function(event) {
            event.stopPropagation(); 
            div.remove(); 
            if (container.childElementCount === 0) {
                contactInfo.style.display = 'block'; 
            }
        };

        div.onclick = function() {
            const allContainers = document.querySelectorAll('.image-container');
            allContainers.forEach(container => container.style.zIndex = 1); 
            div.style.zIndex = 2; 
        };

        div.appendChild(image);
        div.appendChild(closeButton); 
        container.appendChild(div); 
    }

    function displayImages() {
        images.forEach((image, index) => {
            setTimeout(() => {
                createImageContainer(image);
                document.querySelectorAll('.image-container')[index].style.opacity = 1; 
            }, index * 60); 
        });
    }
      // Fonction pour fermer toutes les images
      window.closeAllImages = function() {
        const allContainers = document.querySelectorAll('.image-container');
        allContainers.forEach(container => container.remove());
        contactInfo.style.display = 'block'; // Afficher les informations de contact si toutes les images sont supprimées
    };
    
    
});


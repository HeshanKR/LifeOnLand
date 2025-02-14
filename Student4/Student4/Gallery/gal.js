document.addEventListener('DOMContentLoaded', function() {
   
    function enlargeImage(src, title, description) {
        const enlargedImage = document.getElementById('enlargedImage');
        enlargedImage.src = src;

        const titleElement = document.querySelector('.card h2');
        titleElement.textContent = title;

        const descriptionElement = document.querySelector('.card p');
        descriptionElement.textContent = description;
    }

    const thumbnails = document.querySelectorAll('.thumbnail img');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-description');
            enlargeImage(this.src, title, description);
        });
    });

    // Image slider functionality
    const images = [
        'tinyleaf.jpg',
        'cheetah.jpg',
        'polarbear.jpg',
        'def.jpg',
        'rec.jpg'
    ];

    let currentIndex = 0;
    const totalImages = images.length;

    function setImg(index) {
        slidesImg.src = images[index];
        currentIndex = index;
        updateDescription(currentIndex);
    }

    function updateDescription(index) {
        const descriptions = [
            "The Plant one of the major life on Land which is a primary producer.Predominantly photosynthetic and all other organisms on earth depend on plants.They promote biodiversity & maintain atmosphere",
            "Animals play a crucial roles in ecosysytem helping to maintain balance and biodiversity.They exhibit complex social behaviours like in human.They hold symbolic significance in every culture and religion as they represent strength,freedom and loyalty",
            "Majestic predatotor ruling Artic circle.They are well suited to survive in cold temperature and considered as apex preydator.However these furred creatures are thretened by climate change due to high heat resulting in habitat loss.",
            "Life on land is mainly threatened by highly intelligent human.Human way of fast and modern living has caused direact and indirect damages to animals,plants and other organisms in different habitat.One of the prime example is global warming caused by deforestation ",
            "No planet B,we have to save what we have for next generation by rebuilding the earth we are constanly polluting.Humans have to take protocol like recycle,reuse and follow sustainable lifestyle"
        ];

        const titleElement = document.querySelector('.card h2');
        titleElement.textContent = thumbnails[index].getAttribute('data-title');

        const descriptionElement = document.querySelector('.card p');
        descriptionElement.textContent = descriptions[index];
    }

    // Initialize image and description on load
    const slidesImg = document.getElementById('enlargedImage');
    setImg(currentIndex);

    // Event listeners for prev and next buttons
    document.querySelector('.prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages;
        setImg(currentIndex);
    });

    document.querySelector('.next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalImages;
        setImg(currentIndex);
    });

    
});



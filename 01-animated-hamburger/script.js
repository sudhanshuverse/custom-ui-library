const menuBtn = document.getElementById('menu-btn');
        const container = document.querySelector('.container');
        
        menuBtn.addEventListener('click', () => menuBtn.classList.toggle('open'));
        
        let isDragging = false;
        let currentX, currentY, xOffset = 0, yOffset = 0;

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            xOffset = e.clientX - currentX;
            yOffset = e.clientY - currentY;
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - xOffset;
                currentY = e.clientY - yOffset;
                container.style.left = currentX + 'px';
                container.style.top = currentY + 'px';
            }
        });

        document.addEventListener('mouseup', () => isDragging = false);

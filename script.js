window.addEventListener("load", () => {
  ["col1", "col2", "col3"].forEach((id) => {
    const col = document.getElementById(id);

    // Clone existing images once
    [...col.children].forEach((img) => {
      col.appendChild(img.cloneNode(true));
    });
  });

  col1.classList.add("scroll-fast");
  col2.classList.add("scroll-slow");
  col3.classList.add("scroll-fast");
});

// school logo zig zag
function startMarquee(track, direction = "left", speed = 1) {
  function animate() {
    if (direction === "left") {
      track.scrollLeft += speed;

      const first = track.firstElementChild;

      if (track.scrollLeft >= first.offsetWidth + 24) {
        track.appendChild(first);

        track.scrollLeft -= first.offsetWidth + 24;
      }
    } else {
      track.scrollLeft -= speed;

      if (track.scrollLeft <= 0) {
        const last = track.lastElementChild;

        track.insertBefore(last, track.firstElementChild);

        track.scrollLeft += last.offsetWidth + 24;
      }
    }

    requestAnimationFrame(animate);
  }

  if (direction === "right") {
    const last = track.lastElementChild;
    track.insertBefore(last, track.firstElementChild);
    track.scrollLeft = last.offsetWidth + 24;
  }

  animate();
}

startMarquee(document.getElementById("row1"), "left", 1);
startMarquee(document.getElementById("row2"), "right", 1);

// features controls
const slider = document.getElementById("featuresSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

function getScrollAmount() {
  const card = slider.querySelector(".features__card");

  const cardWidth = card.offsetWidth;
  const gap = parseFloat(
    getComputedStyle(slider).columnGap || getComputedStyle(slider).gap,
  );

  return cardWidth + gap;
}

nextBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: getScrollAmount(),
    behavior: "smooth",
  });
});

prevBtn.addEventListener("click", () => {
  slider.scrollBy({
    left: -getScrollAmount(),
    behavior: "smooth",
  });
});

// learningSlider indicator
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("learningSlider");
  const slides = [...slider.children];
  const dots = [
    ...document.querySelectorAll("#learningDots .learning-pagination__dot"),
  ];

  function updateDots(index) {
    dots.forEach((dot) => dot.classList.remove("active"));

    if (dots[index]) {
      dots[index].classList.add("active");
    }
  }

  function goToSlide(index) {
    const slideWidth = slides[0].offsetWidth + 16;

    slider.scrollTo({
      left: slideWidth * index,
      behavior: "smooth",
    });

    updateDots(index);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  slider.addEventListener("scroll", () => {
    const slideWidth = slides[0].offsetWidth + 16;
    const index = Math.round(slider.scrollLeft / slideWidth);

    updateDots(index);
  });
});

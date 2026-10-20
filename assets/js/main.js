// ===== قائمة الجوال =====
document.addEventListener('DOMContentLoaded', function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }

  // ===== تحدي الرسم =====
  initChallenge();

  // ===== معرض الرسومات =====
  initGallery();

  // ===== نموذج التواصل =====
  initContactForm();
});

// ===== تحدي الخمس دقائق =====
function initChallenge() {
  const ideas = [
    'كوب عصير',
    'زهرة بسيطة',
    'شجرة صغيرة',
    'وجه مبتسم',
    'بيت بسيط',
    'سمكة ملونة',
    'طائرة ورقية',
    'قمر ونجوم',
    'فراشة',
    'تفاحة',
    'قلم رصاص',
    'بالون',
    'مظلة',
    'نجمة خماسية',
    'ورقة شجر',
    'مخروط آيس كريم'
  ];

  const ideaList = document.getElementById('idea-list');
  const randomBtn = document.getElementById('random-idea');
  const startBtn = document.getElementById('start-timer');
  const resetBtn = document.getElementById('reset-timer');
  const timerDisplay = document.getElementById('timer-display');
  const timerLabel = document.getElementById('timer-label');
  const challengeMsg = document.getElementById('challenge-message');
  const currentIdea = document.getElementById('current-idea');

  let timeLeft = 300; // 5 دقائق بالثواني
  let timerInterval = null;
  let timerRunning = false;

  // عرض قائمة الأفكار
  if (ideaList) {
    ideaList.innerHTML = '';
    ideas.forEach(function (idea, index) {
      const tag = document.createElement('span');
      tag.className = 'idea-tag';
      tag.textContent = idea;
      tag.dataset.index = index;
      tag.addEventListener('click', function () {
        document.querySelectorAll('.idea-tag').forEach(function (t) {
          t.classList.remove('selected');
        });
        this.classList.add('selected');
        if (currentIdea) {
          currentIdea.textContent = idea;
        }
      });
      ideaList.appendChild(tag);
    });
  }

  // زر اختيار فكرة عشوائية
  if (randomBtn) {
    randomBtn.addEventListener('click', function () {
      const randomIndex = Math.floor(Math.random() * ideas.length);
      const selectedIdea = ideas[randomIndex];

      document.querySelectorAll('.idea-tag').forEach(function (t) {
        t.classList.remove('selected');
      });

      const tags = document.querySelectorAll('.idea-tag');
      if (tags[randomIndex]) {
        tags[randomIndex].classList.add('selected');
      }

      if (currentIdea) {
        currentIdea.textContent = selectedIdea;
      }

      // تأثير حركي
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  }

  // زر بدء المؤقت
  if (startBtn) {
    startBtn.addEventListener('click', function () {
      if (timerRunning) return;

      timerRunning = true;
      startBtn.disabled = true;
      startBtn.style.opacity = '0.5';
      startBtn.style.cursor = 'not-allowed';
      resetBtn.style.display = 'inline-block';

      if (challengeMsg) {
        challengeMsg.classList.remove('show');
      }

      timerInterval = setInterval(function () {
        timeLeft--;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          timerRunning = false;
          timeLeft = 300;
          timerDisplay.textContent = '05:00';
          timerDisplay.className = 'timer-display';

          if (timerLabel) {
            timerLabel.textContent = 'انتهى الوقت!';
          }

          if (challengeMsg) {
            challengeMsg.innerHTML = '🎉 أحسنت! شارك رسومتك أو احتفظ بها لتلاحظ تطوّرك.';
            challengeMsg.classList.add('show');
          }

          startBtn.disabled = false;
          startBtn.style.opacity = '1';
          startBtn.style.cursor = 'pointer';
          return;
        }

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        const display = String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
        timerDisplay.textContent = display;

        // تغيير اللون حسب الوقت المتبقي
        timerDisplay.classList.remove('warning', 'danger');
        if (timeLeft <= 30) {
          timerDisplay.classList.add('danger');
        } else if (timeLeft <= 60) {
          timerDisplay.classList.add('warning');
        }

        if (timerLabel) {
          timerLabel.textContent = 'الوقت المتبقي';
        }
      }, 1000);
    });
  }

  // زر إعادة المؤقت
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      clearInterval(timerInterval);
      timerRunning = false;
      timeLeft = 300;
      timerDisplay.textContent = '05:00';
      timerDisplay.className = 'timer-display';

      if (timerLabel) {
        timerLabel.textContent = 'اضغط "ابدأ" لبدء التحدي';
      }

      if (challengeMsg) {
        challengeMsg.classList.remove('show');
      }

      startBtn.disabled = false;
      startBtn.style.opacity = '1';
      startBtn.style.cursor = 'pointer';
    });
  }
}

// ===== معرض الرسومات =====
function initGallery() {
  const uploadInput = document.getElementById('upload-image');
  const uploadPreview = document.getElementById('upload-preview');
  const uploadImg = document.getElementById('preview-img');
  const uploadTitle = document.getElementById('upload-title');

  if (uploadInput) {
    uploadInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          if (uploadImg) {
            uploadImg.src = event.target.result;
          }
          if (uploadPreview) {
            uploadPreview.classList.add('show');
          }
          if (uploadTitle) {
            uploadTitle.value = 'رسمتي الجديدة';
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// ===== نموذج التواصل =====
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // التحقق من الحقول المطلوبة
      const name = form.querySelector('[name="name"]');
      const message = form.querySelector('[name="message"]');

      if (!name.value.trim()) {
        name.focus();
        name.style.borderColor = 'var(--pink)';
        return;
      }

      if (!message.value.trim()) {
        message.focus();
        message.style.borderColor = 'var(--pink)';
        return;
      }

      // إظهار رسالة النجاح
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      // إعادة تعيين النموذج
      form.reset();

      // إزالة حدود اللون
      form.querySelectorAll('input, textarea').forEach(function (field) {
        field.style.borderColor = '';
      });
    });
  }
}

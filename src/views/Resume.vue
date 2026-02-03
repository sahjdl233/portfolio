<template>
  <div class="resume-page">
    
    <section class="top-profile">
      <div class="contact-info">
        <h2>My Resume</h2>
        <a href="/resume.pdf" download class="dl-btn">Download PDF</a>
        <div class="details">
          <p>📍 123 Art Street, Tokyo</p>
          <p>📞 +81 90 0000 0000</p>
          <p>✉️ email@example.com</p>
        </div>
      </div>
      <div class="profile-bg" style="background-image: url('/path/to/bg.jpg')"></div>
    </section>

    <section class="about-me">
      <div class="photo-slot">
        <img src="@/assets/me.jpg" alt="Me">
      </div>
      <div class="bio-text">
        <h3>About me...</h3>
        <p>Your introduction text here...</p>
      </div>
    </section>

    <section class="experience">
      <h3>Professional Experience</h3>
      <div class="timeline">
        <div class="timeline-item">
          <div class="year">2023 - Present</div>
          <div class="content">
            <h4>Senior Animator</h4>
            <p>Studio Name - Description of duties.</p>
          </div>
        </div>
        <div class="timeline-item">
          <div class="year">2021 - 2023</div>
          <div class="content">
            <h4>Junior Artist</h4>
            <p>Studio Name - Description of duties.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
.resume-page { max-width: 1000px; margin: 0 auto; padding: 40px; }

/* Grid 布局 */
.top-profile {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 左1右2比例 */
  height: 300px;
  background: #f9f9f9;
  margin-bottom: 40px;
}
.contact-info { padding: 30px; }
.profile-bg { background-size: cover; background-position: center; }

.about-me {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 30px;
  margin-bottom: 60px;
}
.photo-slot img { width: 100%; }

/* 时间线样式 */
.timeline {
  border-left: 2px solid #ccc;
  padding-left: 20px;
  margin-top: 20px;
}
.timeline-item { position: relative; margin-bottom: 30px; }
.timeline-item::before {
  content: '';
  position: absolute;
  left: -26px; top: 5px;
  width: 10px; height: 10px;
  background: #000;
  border-radius: 50%;
}
.year { font-weight: bold; color: #666; margin-bottom: 5px; }
</style>
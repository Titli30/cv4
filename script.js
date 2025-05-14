document.getElementById('startBtn').onclick = () => {
  document.getElementById('builderSection').style.display = 'block';
};

const form = document.getElementById('resumeForm');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const data = new FormData(form);

  document.getElementById('outName').innerText = data.get('name');
  document.getElementById('outGuardian').innerText = "Guardian: " + data.get('guardian');
  document.getElementById('outEmail').innerText = data.get('email');
  document.getElementById('outPhone').innerText = data.get('phone');
  document.getElementById('outEducation').innerText = data.get('education');
  document.getElementById('outCompany').innerText = data.get('company') || 'N/A';
  document.getElementById('outHobbies').innerText = data.get('hobbies');

  const projectLink = data.get('project');
  document.getElementById('outProject').href = projectLink;
  document.getElementById('outProject').innerText = projectLink || 'N/A';

  const extLink = data.get('link');
  document.getElementById('outLink').href = extLink;
  document.getElementById('outLink').innerText = extLink || 'N/A';

  const file = data.get('uploadImg');
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.getElementById('resumeImg');
      img.src = e.target.result;
      img.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

document.getElementById('downloadPdf').onclick = () => {
  const resume = document.getElementById('resumeOutput');
  const image = document.getElementById('resumeImg');
  const originalDisplay = image.style.display;
  image.style.display = image.src ? 'block' : 'none';

  html2pdf().from(resume).save('resume.pdf');

  setTimeout(() => {
    image.style.display = originalDisplay;
  }, 1000);
};

document.getElementById('themeSwitch').onclick = () => {
  const template = document.getElementById('resumeOutput');
  template.classList.toggle('theme-dark');
};

document.getElementById('templateSwitch').onclick = () => {
  const template = document.getElementById('resumeOutput');
  template.style.borderLeft = template.style.borderLeft === '6px solid teal'
    ? '6px solid #6c5ce7' : '6px solid teal';
};

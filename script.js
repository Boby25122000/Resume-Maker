document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form');
    const formatsSection = document.getElementById('formats');
    const previewSection = document.getElementById('resume-preview');
    const resumeContainer = document.getElementById('resume-container');
    const downloadBtn = document.getElementById('download-btn');
    let selectedFormat = 1;
    let formData;

    // Handle form submission
    resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const photo = document.getElementById('photo').files[0];
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const summary = document.getElementById('summary').value;
        const experience = document.getElementById('experience').value;
        const education = document.getElementById('education').value;
        const skills = document.getElementById('skills').value;
        const projects = document.getElementById('projects').value;

        formData = { photo, name, email, phone, address, summary, experience, education, skills, projects };
        formatsSection.classList.remove('hidden');
    });

    // Handle format selection
    document.querySelectorAll('.format-btn').forEach(button => {
        button.addEventListener('click', () => {
            selectedFormat = button.dataset.format;
            formatsSection.classList.add('hidden');
            previewSection.classList.remove('hidden');

            const photoURL = formData.photo ? URL.createObjectURL(formData.photo) : '';
            generateResume(formData, selectedFormat, photoURL);
        });
    });

    // Handle download
    downloadBtn.addEventListener('click', () => {
        const element = document.createElement('a');
        const resumeContent = resumeContainer.innerHTML;
        const blob = new Blob([resumeContent], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        element.href = url;
        element.download = `${formData.name}_Resume.html`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    });

    // Generate resume based on format
    function generateResume(data, format, photoURL) {
        const { name, email, phone, address, summary, experience, education, skills, projects } = data;
        let content = `<img src="${photoURL}" alt="Photo" style="width:100px;height:100px;border-radius:50%;">`;

        if (format == 1) {
            content += `
                <h1>${name}</h1>
                <p>Email: ${email}  |   Phone: ${phone}</p>
                <p>Address: ${address}</p>
                <h2>Summary</h2><p>${summary}</p>
                <h2>Experience</h2><p>${experience}</p>
                <h2>Education</h2><p>${education}</p>
                <h2>Skills</h2><p>${skills}</p>
                <h2>Projects</h2><p>${projects}</p>`;
        }
        // Add more formats (2-5) as needed...

        resumeContainer.innerHTML = content;
    }
});

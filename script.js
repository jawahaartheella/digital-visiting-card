lucide.createIcons();

const currentDate = new Date();
const month = String(currentDate.getMonth()+1).padStart(2, '0');
const year = String(currentDate.getFullYear()).slice(-2);
let dateEl = document.querySelector('.date');
dateEl.textContent = `${month}-${year}`;


async function generateCardImage(cardFace) {
    const width = 1600;
    const height = 1000;

    const canvas = document.createElement('canvas');

    canvas.width = width;
    canvas.height = height;
    canvas.style.borderRadius = "20px";

    const ctx = canvas.getContext('2d');

    await document.fonts.ready;

    if(cardFace === "front") {
        await drawFront(ctx, width, height);
    } else if(cardFace === "back") {
        await drawBack(ctx, width, height);
    }

    return canvas;
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight) {

    const words = text.split(" ");
    let line = "";

    for (let i = 0; i < words.length; i++) {

        const testLine = line + words[i] + " ";
        const testWidth = ctx.measureText(testLine).width;

        if (testWidth > maxWidth && i > 0) {

            ctx.fillText(line, x, y);

            line = words[i] + " ";
            y += lineHeight;

        } else {

            line = testLine;

        }
    }

    ctx.fillText(line, x, y);
}

async function drawBack(ctx, width, height) {
    // Background
    ctx.fillStyle = "#c8aa74";
    ctx.fillRect(0, 0, width, height);

    // Draw Circle Dot
    ctx.beginPath();
    ctx.arc(86, 92, 12, 0, Math.PI * 2);
    ctx.strokeStyle = "#252a27"; 
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(86, 92, 3.52, 0, Math.PI * 2);
    ctx.fillStyle = "#252a27";
    ctx.fill();

    // Draw Location
    const location = document.querySelector('.card-back .location-back p').textContent.trim();

    ctx.font = "24px 'IBM Plex Mono'";
    ctx.fillStyle = "#151817";
    ctx.fillText(location, 110, 100);

    // Draw Sub Tile
    const subTitle = document.querySelector('.back-sub-title').textContent.trim();

    ctx.font = "19px 'IBM Plex Mono'";
    ctx.letterSpacing = "4px";
    ctx.fillStyle = "#151817"; 
    ctx.fillText(subTitle.toUpperCase(), 80, 300);

    // Draw Back Title
    ctx.save();

    const titleElement = document.querySelector('.back-title')
    
    const titleLines = titleElement.innerText.trim().split("\n");
    
    ctx.font = "500 56px 'Playfair Display'";
    ctx.fillStyle = "#151817"; 
    ctx.letterSpacing = "-2px"
    ctx.fillText(titleLines[0].trim(), 80, 380);
    ctx.fillText(titleLines[1].trim(), 80, 435);

    ctx.restore();

    // Draw QR Image
    const qrImage = document.querySelector('.back-qr-code');
    const img = new Image;
    img.src = qrImage.src;

    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
    });

    ctx.drawImage(img, 80, 580, 150, 150);

    // Draw QR Text
    const qrText = document.querySelector('.qr-text').textContent.trim();

    ctx.font = "300 18px 'IBM Plex Mono'";
    ctx.fillStyle = "#151817"; 
    drawWrappedText(ctx, qrText, 260, 630, 550, 32);

    // Draw Web Link
    const webLink = document.querySelector('.website-link').textContent.trim();

    ctx.font = "26px 'DM Sans'";
    ctx.fillStyle = "#151817"; 
    ctx.fillText(webLink, 80, 920);

    // Draw Signature Block
    const signatureElement = document.querySelector('.signature-block');
    const signatureLines = signatureElement.textContent.trim().split('\n');

    console.log(signatureLines);

    ctx.font = "300 18px 'DM Sans'";
    ctx.fillStyle = "#151817"; 
    ctx.fillText(signatureLines[0].trim(), 1350, 900);
    ctx.fillText(signatureLines[1].trim(), 1350, 930);
}

async function drawFront(ctx, width, height) {
    // Background
    ctx.fillStyle = "#252a27";
    ctx.fillRect(0, 0, width, height);

    // Draw Circle Dot
    ctx.beginPath();
    ctx.arc(86, 92, 12, 0, Math.PI * 2);
    ctx.strokeStyle = "#eeece4"; 
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(86, 92, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#eeece4";
    ctx.lineWidth = 10;
    ctx.fill();

    // Draw Location
    const location = document.querySelector('.card-front .location p').textContent.trim();

    ctx.font = "24px 'IBM Plex Mono'";
    ctx.fillStyle = "#eeece4";
    ctx.fillText(location, 110, 100);

    // Draw QR Image
    const qrImage = document.querySelector('.front-qr-code');
    const img = new Image;
    img.src = qrImage.src;

    await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
    });

    ctx.drawImage(img, 1350, 74, 150, 150);

    // Draw Name
    const nameElement = document.querySelector('.name');
    const nameLines = nameElement.textContent.trim().split('\n');

    ctx.font = "500 64px 'Playfair Display'";
    ctx.fillStyle = "#eeece4";
    ctx.fillText(nameLines[0], 80, 470);
    ctx.fillText(nameLines[1], 80, 540);

    // Draw Role
    const role = document.querySelector('.card-front .role').textContent.trim();
    
    ctx.font = "20px 'DM Sans'";
    ctx.fillStyle = "#c8aa74";
    ctx.fillText(role.toUpperCase(), 80, 585);

    // Draw Email & Phone
    const email = document.querySelector('.email').textContent.trim();
    const phone = document.querySelector('.mobile').textContent.trim();

    ctx.font = "18px 'DM Sans'";
    ctx.fillStyle = "#eeece4";
    ctx.fillText(email, 80, 900);
    ctx.fillText(phone, 80, 930);

    // Draw Coordinates
    const coordinates = document.querySelectorAll('.coordinates p');

    console.log(coordinates);

    const latitude = coordinates[0].textContent.trim();
    const longitude = coordinates[1].textContent.trim();

    ctx.font = "16px 'IBM Plex Mono'";
    ctx.fillStyle = "#eeece4";
    ctx.fillText(latitude, 1350, 900);
    ctx.fillText(longitude, 1350, 930);
}

function flipCard() {
    let flipButton = document.getElementById('flipButton');
    
    flipButton.addEventListener('click', () => {
        let card = document.getElementById('mainCard');

        card.classList.toggle('flipped')
    });
}

function showDownloadMenu() {
    const downloadBtn = document.getElementById('downloadBtn');

    downloadBtn.addEventListener('click', () => {
        const downloadMenu = document.getElementById('downloadMenu');
        downloadMenu.classList.toggle('show');
    });
}

function onDonloadItemClick() {
    const downloadFrontBtn = document.getElementById('downloadFront');
    const downloadBackBtn = document.getElementById('downloadBack');

    downloadFrontBtn.addEventListener('click', async () => {
        await downloadCardToLocal("front");
    });

    downloadBackBtn.addEventListener('click', async () => {
        await downloadCardToLocal("back");
    });
}

async function downloadCardToLocal(cardFace) {
     const canvas = await generateCardImage(cardFace);

    canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `visiting-card-${cardFace}.png`;

        link.click();

        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    }, "image/png");
}

function shareCard() {
    const shareBtn = document.getElementById('shareBtn');

    shareBtn.addEventListener('click', async () => {

        try {
            const frontCanvas = await generateCardImage('front');
            const backCanvas = await generateCardImage('back');

            const frontBlob = await canvasToBlob(frontCanvas);
            const backBlob = await canvasToBlob(backCanvas);

            const frontFile = new File([frontBlob], "visiting-card-front.png", {type: "image/png"});
            const backFile = new File([backBlob], "visiting-card-bakc.png", {type: "image/png"});

            const files = [frontFile, backFile];

            if(navigator.share && navigator.canShare({files})) {
                await navigator.share({
                    title: 'Digital Contact Card',
                    files: files
                });
            } else {
                await navigator.clipboard.writeText(window.location.href);
                document.querySelector('.copy-link-toastr').classList.add('show');
                setTimeout(() => {
                    document.querySelector('.copy-link-toastr').classList.remove('show');
                }, 2000);
            }
        } catch(error) {
            if (error.name === "AbortError") {
                return;
            }

            console.error("Share failed:", error);
        }
    });
}

function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if(blob) {
                resolve(blob);
            } else {
                reject(new Error("Could not create PNG"));
            }
        }, "image/png");
    });
}

function downloadVCard() {
    const saveContactBtn = document.getElementById('saveContactBtn');

    saveContactBtn.addEventListener('click', () => {
        let name = document.querySelector('.name').textContent.trim();
        let role = document.querySelector('.role').textContent.trim();
        let email = document.querySelector('.email').textContent.trim();
        let tel = document.querySelector('.mobile').textContent.trim().replace(/\s+/g, "");

        const vCard = [
            "BEGIN:VCARD",
            "VERSION:3.0",
            `FN:${name}`,
            `TEL:${tel}`,
            `EMAIL:${email}`,
            `TITLE:${role}`,
            "END:VCARD",
        ].join("\r\n");
        const blob = new Blob([vCard], {type: "text/vcard"});

        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url
        link.download = "Amarendra-Bahubali.vcf";
        link.click();

        link.remove();

        setTimeout(() => {
            URL.revokeObjectURL(url);
        }, 1000);
    });
}

flipCard();
showDownloadMenu();
onDonloadItemClick();
shareCard();
downloadVCard();
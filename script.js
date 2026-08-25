// =========================================
// NAMA DARI LINK ?to=Opii
// =========================================

const params =
    new URLSearchParams(
        window.location.search
    );

const nama =
    params.get("to");

if (nama) {

    const namaDecoded =
        decodeURIComponent(nama)
            .replace(/\+/g, " ");

    document.getElementById(
        "namaOpii"
    ).textContent =
        namaDecoded;
}



// =========================================
// AUDIO
// =========================================

const backsound =
    document.getElementById("backsound");

const music =
    document.getElementById("music");

const musicButton =
    document.getElementById("musicButton");


// Posisi awal Monokrom
const MONOKROM_START = 155; // 02:35
const MONOKROM_END = 183;   // 03:03


// =========================================
// BUKA SURAT
// =========================================

function bukaSurat() {

    document
        .getElementById("surat")
        .scrollIntoView({
            behavior: "smooth"
        });


    // Mulai backsound
    mulaiBacksound();

}



// =========================================
// MULAI BACKSOUND
// =========================================

function mulaiBacksound() {

    if (!backsound) {
        return;
    }


    // Jangan jalankan backsound
    // jika Monokrom sedang berjalan

    if (
        music &&
        !music.paused
    ) {
        return;
    }


    backsound.play()
        .catch(() => {

            console.log(
                "Backsound menunggu interaksi pengguna."
            );

        });

}



// =========================================
// PAUSE BACKSOUND
// =========================================

function pauseBacksound() {

    if (!backsound) {
        return;
    }

    backsound.pause();

}



// =========================================
// PUTAR MONOKROM
// =========================================

function putarLagu() {

    if (!music) {
        return;
    }


    // -------------------------------------
    // Jika Monokrom sedang diputar
    // -------------------------------------

    if (!music.paused) {

        music.pause();

        musicButton.textContent =
            "▶ Putar";

        // Setelah Monokrom berhenti,
        // backsound kembali

        mulaiBacksound();

        return;
    }



    // -------------------------------------
    // Simpan posisi backsound
    // -------------------------------------

    pauseBacksound();



    // -------------------------------------
    // Mulai Monokrom dari 02:35
    // -------------------------------------

    music.currentTime =
        MONOKROM_START;


    music.play()
        .then(() => {

            musicButton.textContent =
                "⏸ Monokrom";

        })
        .catch(() => {

            alert(
                "Musik Monokrom belum ditemukan. Pastikan file monokrom.mp3 berada di assets/music/"
            );

        });

}



// =========================================
// MONOKROM BERJALAN
// =========================================

music.addEventListener(
    "timeupdate",
    function () {

        if (
            music.currentTime >=
            MONOKROM_END
        ) {

            // Stop Monokrom

            music.pause();

            music.currentTime =
                MONOKROM_START;


            musicButton.textContent =
                "▶ Putar";


            // Kembali ke backsound

            mulaiBacksound();

        }

    }
);



// =========================================
// KETIKA MONOKROM SELESAI
// =========================================

music.addEventListener(
    "ended",
    function () {

        musicButton.textContent =
            "▶ Putar";


        mulaiBacksound();

    }
);



// =========================================
// BUNGA TERBANG
// =========================================

const flowerContainer =
    document.getElementById(
        "flowers"
    );


function createFlower() {

    const flower =
        document.createElement(
            "div"
        );


    flower.className =
        "floating-flower";


    const flowers = [
        "🌹",
        "🌷",
        "🌺",
        "❤️",
        "🌸"
    ];


    flower.textContent =
        flowers[
            Math.floor(
                Math.random()
                * flowers.length
            )
        ];


    flower.style.left =
        Math.random()
        * 100
        + "vw";


    flower.style.fontSize =
        (
            15 +
            Math.random() * 20
        )
        + "px";


    flower.style.animationDuration =
        (
            5 +
            Math.random() * 5
        )
        + "s";


    flowerContainer.appendChild(
        flower
    );


    setTimeout(
        () => {

            flower.remove();

        },
        10000
    );

}


setInterval(
    createFlower,
    1500
);
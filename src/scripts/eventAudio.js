document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('event-audio');
    const waveContainer = document.getElementById('audioWave');
    const playPauseBtn = document.getElementById('audioPlayPause');
    const muteBtn = document.getElementById('audioMute');
    const volumeSlider = document.getElementById('audioVolume');
    const currentTimeEl = document.getElementById('audioCurrent');
    const durationEl = document.getElementById('audioDuration');

    const wavesurfer = WaveSurfer.create({
        container: waveContainer,
        waveColor: '#b7a98e',
        progressColor: '#6d5c43',
        height: 60,
        barWidth: 2,
        responsive: true,
        interact: true,
        cursorColor: '#6d5c43',
        backend: 'MediaElement',
        mediaControls: false,
        mediaType: 'audio',
    });

    wavesurfer.load(audio.src);

    // Play/Pause: меняем иконку
    playPauseBtn.addEventListener('click', function () {
        wavesurfer.playPause();
    });

    function setPlayPauseIcon(isPlaying) {
        const img = playPauseBtn.querySelector('img');
        if (!img) return;
        if (isPlaying) {
            img.src = '../assets/icons/pause.svg';
            img.alt = 'Пауза';
        } else {
            img.src = '../assets/icons/player_play.svg';
            img.alt = 'Воспроизвести';
        }
    }

    wavesurfer.on('play', function () {
        playPauseBtn.classList.add('playing');
        setPlayPauseIcon(true);
    });
    wavesurfer.on('pause', function () {
        playPauseBtn.classList.remove('playing');
        setPlayPauseIcon(false);
    });

    // Функция обновления иконки громкости в зависимости от процента
    function setVolumeIcon(volumePercent) {
        const img = muteBtn.querySelector('img');
        if (!img) return;

        if (volumePercent === 0) {
            img.src = '../assets/icons/volume3.svg';
            img.alt = 'Без звука';
        } else if (volumePercent <= 50) {
            img.src = '../assets/icons/volume2.svg';
            img.alt = 'Тише';
        } else {
            img.src = '../assets/icons/volume.svg';
            img.alt = 'Громко';
        }
    }

    // Клик по кнопке звука - показать/скрыть ползунок
    muteBtn.addEventListener('click', function () {
        if (volumeSlider.style.display === 'none' || volumeSlider.style.display === '') {
            volumeSlider.style.display = 'inline-block';
        } else {
            volumeSlider.style.display = 'none';
        }
    });



    volumeSlider.addEventListener('input', function () {
        const volumeValue = parseInt(this.value);
        const volume = volumeValue / 100;

        wavesurfer.setVolume(volume);

        setVolumeIcon(volumeValue);
    });

    setPlayPauseIcon(false);
    setVolumeIcon(100);

    function formatTime(sec) {
        sec = Math.floor(sec);
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    wavesurfer.on('audioprocess', function () {
        currentTimeEl.textContent = formatTime(wavesurfer.getCurrentTime());
    });
    wavesurfer.on('ready', function () {
        durationEl.textContent = formatTime(wavesurfer.getDuration());
    });
    wavesurfer.on('seek', function () {
        currentTimeEl.textContent = formatTime(wavesurfer.getCurrentTime());
    });
});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const musicList = document.getElementById('musicList');
    const albumSelect = document.getElementById('albumSelect');
    const albumTitle = document.getElementById('albumTitle');
    const albumSubtitle = document.getElementById('albumSubtitle');
    const albumCover = document.getElementById('albumCover');

    // 假設 API 的 URL
    const apiUrl = './albums.json'; // 替換成實際的 API URL

    // 呼叫 API 並取得 JSON 資料
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            populateAlbumSelect(data);
        })
        .catch(error => console.error('取得音樂資料時出錯:', error));

    // 將專輯名稱填入下拉選單
    function populateAlbumSelect(musicData) {
        const albums = Object.keys(musicData);

        albums.forEach(albumKey => {
            const album = musicData[albumKey];
            const option = document.createElement('option');
            option.value = albumKey;
            option.textContent = album.name;
            albumSelect.appendChild(option);
        });

        // 當選擇專輯時，顯示對應的音樂清單和專輯資訊
        albumSelect.addEventListener('change', () => {
            const selectedAlbumKey = albumSelect.value;
            if (selectedAlbumKey) {
                const selectedAlbum = musicData[selectedAlbumKey];
                displayAlbumInfo(selectedAlbum);
                displayMusicList(selectedAlbum.tracks);
            } else {
                clearAlbumInfo();
                musicList.innerHTML = ''; // 清空音樂清單
            }
        });
    }

    // 顯示專輯資訊
    function displayAlbumInfo(album) {
        albumTitle.textContent = album.name;
        albumSubtitle.textContent = album.subtitle || ''; // 若無副標題則顯示空字串
        if (album.cover) {
            albumCover.src = album.cover;
            albumCover.style.display = 'block';
        } else {
            albumCover.style.display = 'none';
        }
    }

    // 清空專輯資訊
    function clearAlbumInfo() {
        albumTitle.textContent = '';
        albumSubtitle.textContent = '';
        albumCover.src = '';
        albumCover.style.display = 'none';
    }

    // 顯示音樂清單
    function displayMusicList(tracks) {
        musicList.innerHTML = ''; // 先清空現有的清單

        tracks.forEach(track => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'track-item', 'd-flex', 'justify-content-between', 'align-items-center');
            listItem.textContent = track.name;

            // 播放按鈕
            const playButton = document.createElement('button');
            playButton.classList.add('btn', 'btn-primary', 'btn-sm');
            playButton.textContent = '播放';
            playButton.addEventListener('click', () => {
                playTrack(track.path);
            });

            listItem.appendChild(playButton);
            musicList.appendChild(listItem);
        });
    }

    // 播放選定的音樂
    function playTrack(path) {
        audioPlayer.src = path;
        audioPlayer.play();
    }
});

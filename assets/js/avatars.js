// import file from '../other/avatars.csv';

document.addEventListener('DOMContentLoaded', () => {
  const $avatarsElem = document.querySelector('[data-js-avatars]');
  // const avatars = {};
  let fileContents;
  const avatarSections = [];
  const avatarSectionHtmlList = [];

  const fileContentsToSections = () => {
    const avatars = {};

    fileContents.forEach(avatar => {
      const { Type } = avatar;
      const typeList = avatars[Type] || [];
      typeList.push(avatar);
      avatars[Type] = typeList;
    });

    Object.keys(avatars).forEach(key => {
      const avList = avatars[key];
      const available = avList.filter(a => a.Available === 'TRUE');
      const count = available.length;
      
      if (count > 0) {
        avatarSections.push({
          name: key,
          avatars: available,
          count
        });
      }
    });
  };

  const avatarItem = (item) => {
    const {
      Name,
      Image,
      Description,
      Released,
      URL
    } = item;

    return `
      <li class="avatar-item">
        <a href="${URL}" target="_blank">
          <img class="avatar-item-img" src="https://images.neopets.com/neoboards/avatars/${Image}.gif" />
          <div class="avatar-item-name">${Name}</div>
          <div class="avatar-item-date">${Released}</div>
          <p class="avatar-item-desc">${Description}</p>
        </a>
      </li>
    `;
  };

  const sectionsToHtml = () => {
    avatarSections
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(section => {
      const { name, avatars, count } = section;

      avatarSectionHtmlList.push(`
        <li class="avatar-section">
          <h2>${name} (${count})</h2>
          <ul class="avatar-list">
            ${avatars.map(a => avatarItem(a)).join('')}
          </ul>
        </li>
      `);
    });
  };

  const renderHtml = () => {
    avatarSectionHtmlList.forEach(section => {
      $avatarsElem.innerHTML += section;
    });
  }

  const displayAvatars = () => {
    console.log($avatarsElem);
    fileContentsToSections();
    sectionsToHtml();
    renderHtml();
  };

  const readFile = () => {
    fetch('/assets/other/avatars.csv')
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true, // Treat the first row as header
        complete: (results) => {
          fileContents = results.data
          displayAvatars();
        }
      });
    });
  };

  readFile();
});



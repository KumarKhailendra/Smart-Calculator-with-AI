export function setMetaData(metaData) {
    let titleElement = document.head.querySelector('title');
    if (!titleElement && metaData.title) {
        titleElement = document.createElement('title');
        document.head.appendChild(titleElement);
    }
    titleElement.textContent = metaData.title || '';

    let descriptionElement = document.head.querySelector('meta[name="description"]');
    if (!descriptionElement && metaData.description) {
        descriptionElement = document.createElement('meta');
        descriptionElement.name = 'description';
        document.head.appendChild(descriptionElement);
    }
    descriptionElement.content = metaData.description || '';

    let keywordsElement = document.head.querySelector('meta[name="keywords"]');
    if (!keywordsElement || metaData.keywords) {
        keywordsElement = document.createElement('meta');
        keywordsElement.name = 'keywords';
        document.head.appendChild(keywordsElement);
    }
    keywordsElement.content = (metaData.keywords || []).join(', ');

    let icon32 = document.head.querySelector('link[rel="icon"][sizes="32x32]');
    if (!icon32 && metaData.icon32) {
        icon32 = document.createElement('link');
        icon32.rel = 'icon';
        icon32.type = 'image/*';
        icon32.sizes = '32x32';
        document.head.appendChild(icon32);
    }
    icon32.href = metaData.icon32;

    let icon16 = document.head.querySelector('link[rel="icon"][sizes="16x16]');
    if (!icon16 && metaData.icon16) {
        icon16 = document.createElement('link');
        icon16.rel = 'icon';
        icon16.type = 'image/*';
        icon16.sizes = '16x16';
        document.head.appendChild(icon16);
    }
    icon16.href = metaData.icon16;

    let manifestLink = document.head.querySelector('link[rel="manifest"]');
    if (!manifestLink || metaData.manifestLink) {
        manifestLink = document.createElement('link');
        manifestLink.rel = 'manifest';
        document.head.appendChild(manifestLink);
    }
    manifestLink.href = metaData.manifestLink;

    (metaData.stylessheets || []).forEach(href => {
        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = href;
        document.head.appendChild(linkElement);
    });

    (metaData.scripts || []).forEach(src => {
        const scriptElement = document.createElement('script');
        scriptElement.src = src;
        document.head.appendChild(scriptElement);
    });

    (metaData.bodyScripts || []).forEach(src => {
        const scriptElement = document.createElement('script');
        scriptElement.src = src;
        document.body.appendChild(scriptElement);
    });
}
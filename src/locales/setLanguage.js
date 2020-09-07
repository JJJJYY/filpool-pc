import intl from 'react-intl-universal';
import en from './en';
import zh from './zh';
import zhTW from './zh-TW';

// locale data
const locales = {
    en,
    zh,
    zhTW
};

export default currentLocale => intl.init({
    currentLocale,
    locales,
});

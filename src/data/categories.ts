import { StoryCategory } from '../types/story';
import slFolktalesCover from '../assets/images/sl_folktales_cover_1794409847654.jpg';
import slVillageCover from '../assets/images/sl_village_cover_1794409848002.jpg';
import slNatureCover from '../assets/images/sl_nature_cover_1794409848441.jpg';
import slInspiringLivesCover from '../assets/images/inspiring_lives_cover_1794927164349.jpg';

export const CATEGORIES: StoryCategory[] = [
  {
    id: 'folktales',
    titleEn: 'Folk Tales & Parables',
    titleSi: 'ජන කතා සහ උපමා කතා',
    descriptionSi: 'සාම්ප්‍රදායික ශ්‍රී ලාංකික ජන කතා සහ ජීවිතයට වටිනා ආදර්ශ ලබා දෙන උපමා කතා',
    image: slFolktalesCover,
  },
  {
    id: 'village',
    titleEn: 'Village & Everyday Life',
    titleSi: 'ගැමි ජීවිතය සහ එදිනෙදා කතා',
    descriptionSi: 'අපේ ගම, රතු CTB බස් රථය, ගැමි එකමුතුව සහ සරල ජීවන අත්දැකීම් පිළිබඳ කතා',
    image: slVillageCover,
  },
  {
    id: 'nature',
    titleEn: 'Sri Lankan Nature & Wildlife',
    titleSi: 'ලංකාවේ සොබාදහම සහ සතුන්',
    descriptionSi: 'සිංහරාජය, යාල වනෝද්‍යානය, අලි ඇතුන්, මොනරුන් සහ සුන්දර පරිසර කතා',
    image: slNatureCover,
  },
  {
    id: 'inspiring-lives',
    titleEn: 'Inspiring Lives',
    titleSi: 'ලෝකය වෙනස් කළ අය',
    descriptionSi: 'ලෝකය වෙනස් කළ නිර්මාතෘවරුන්ගේ සහ විද්‍යාඥයන්ගේ ජීවිත කතා',
    image: slInspiringLivesCover,
  },
];

export const STORY_CATEGORIES = CATEGORIES;

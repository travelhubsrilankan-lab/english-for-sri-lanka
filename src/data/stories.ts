import { Story, StoryCategory } from '../types/story';
import clockmakerCover from '../assets/images/clockmaker_tower_1793981214576.jpg';
import forestFluteCover from '../assets/images/forest_flute_1793981229566.jpg';
import mayaRobotCover from '../assets/images/maya_robot_1793981243185.jpg';
import cinnamonLoafCover from '../assets/images/cinnamon_loaf_1793981258154.jpg';
import cloudKiteCover from '../assets/images/cloud_kite_1793981271109.jpg';
import seaTurtleCover from '../assets/images/sea_turtle_1794154561537.jpg';
import auroraWindmillCover from '../assets/images/aurora_windmill_1794154579373.jpg';
import villagePotterCover from '../assets/images/village_potter_1794154597308.jpg';

export const STORY_CATEGORIES: StoryCategory[] = [
  {
    id: 'mystery',
    titleEn: 'Mystery & Adventure',
    titleSi: 'අබිරහස් සහ වික්‍රමාන්විත',
    descriptionSi: 'විස්මිත කුලුනු, පැරණි රහස් සහ අහස සිපගන්නා සරුංගල් කතා',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    coverImage: clockmakerCover,
  },
  {
    id: 'nature',
    titleEn: 'Nature & Wildlife',
    titleSi: 'සොබාදහම සහ වනජීවී',
    descriptionSi: 'ලස්සන ලාංකික වනාන්තර, දඟකාර සතුන් සහ මුහුදු වෙරළේ විස්මයන්',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    coverImage: forestFluteCover,
  },
  {
    id: 'scifi',
    titleEn: 'Sci-Fi & Inventions',
    titleSi: 'විද්‍යා ප්‍රබන්ධ සහ නව නිපැයුම්',
    descriptionSi: 'මිත්‍රශීලී රොබෝවරු, හිරු බලශක්තිය සහ අනාගත සොයාගැනීම්',
    badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    coverImage: mayaRobotCover,
  },
  {
    id: 'kindness',
    titleEn: 'Kindness & Community',
    titleSi: 'දයාව සහ මිත්‍රත්වය',
    descriptionSi: 'උණුසුම් බේකරි, ගමේ මිතුරන් සහ බෙදාහදා ගැනීමේ සතුට',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    coverImage: cinnamonLoafCover,
  },
];

export const STORIES: Story[] = [
  {
    id: 'clockmaker-tower',
    categoryId: 'mystery',
    categoryTitleEn: '1. Mystery & Adventure',
    categoryTitleSi: 'අබිරහස් සහ වික්‍රමාන්විත',
    titleEn: "The Secret of the Clockmaker's Tower",
    titleSi: 'ඔරලෝසු සාදන්නාගේ කුලුනේ රහස',
    level: 'Elementary (A2)',
    genreEn: 'Mystery & Invention',
    genreSi: 'අබිරහස් සහ නව නිපැයුම්',
    estimatedMinutes: 6,
    coverAccent: '#d97706',
    coverImage: clockmakerCover,
    theme: 'steampunk',
    quiz: [
      {
        id: 'cm-q1',
        questionEn: 'What strange thing happened to the great town clock at midnight?',
        questionSi: 'මධ්‍යම රාත්‍රියේදී නගරයේ මහා ඔරලෝසුවට සිදුවූ අමුතු සිදුවීම කුමක්ද?',
        options: ['The clock stopped completely and made no sound', 'The golden clock hands began spinning backwards', 'The bronze bells fell from the tower roof'],
        optionsSi: ['ඔරලෝසුව සම්පූර්ණයෙන්ම නැවතී කිසිදු ශබ්දයක් නොනැඟීම', 'රන්වන් ඔරලෝසු කටු පසුපසට කරකැවෙන්නට පටන් ගැනීම', 'ලෝකඩ සීනු කුලුනු වහලයෙන් බිමට වැටීම'],
        correctIndex: 1,
        explanationSi: 'කතාවේ සඳහන් වන්නේ මධ්‍යම රාත්‍රියේදී ඔරලෝසු කටු අසාමාන්‍ය ලෙස පසුපසට කරකැවෙන්නට පටන් ගත් බවයි (spinning backwards).'
      },
      {
        id: 'cm-q2',
        questionEn: 'What did young Leo find trapped inside the bronze balance wheel?',
        questionSi: 'ලෝකඩ දැති රෝද යාන්ත්‍රණය ඇතුළේ සිරවී සිටියදී ලියෝට හමුවූයේ කුමක්ද?',
        options: ['A tiny silver mechanical sparrow with tangled feathers', 'A valuable missing ruby gemstone', 'An old rusty iron key'],
        optionsSi: ['පිහාටු පැටලී සිටි කුඩා රිදී යාන්ත්‍රික ගේ කුරුල්ලෙක්', 'නැතිවූ වටිනා රූබි මැණික් ගලක්', 'පැරණි මලකඩ කෑ යකඩ යතුරක්'],
        correctIndex: 0,
        explanationSi: 'ලියෝ දැති රෝද අතර සිරවී සිටි කුඩා රිදී පක්ෂියා (silver sparrow) ප්‍රවේශමෙන් නිදහස් කළේය.'
      }
    ],
    chapters: [
      {
        id: 'cm-ch1',
        chapterNumber: 1,
        titleEn: 'The Midnight Chimes of Riverbend',
        titleSi: 'රිවර්බෙන්ඩ් නගරයේ මධ්‍යම රාත්‍රී නාදය',
        subtitleEn: 'The mysterious backwards ticking of time',
        subtitleSi: 'කාලය පසුපසට ගමන් කිරීමේ අබිරහස',
        summaryEn: 'High above the sleeping roofs of Riverbend, an ancient clock tower begins to tick backwards under the midnight fog.',
        summarySi: 'නිදා සිටින නගරය ඉහළින්, පැරණි ඔරලෝසු කුලුන මධ්‍යම රාත්‍රී මීදුම මැද පසුපසට ශබ්ද නඟන්නට පටන් ගනී.',
        funFactEn: 'Mechanical clocks have been keeping time for over 700 years using weight-driven gears called escapements!',
        funFactSi: 'යාන්ත්‍රික ඔරලෝසු වසර 700 කට වැඩි කාලයක් තිස්සේ එස්කේප්මන්ට් (Escapement) නම් දැති රෝද මඟින් වේලාව මනිනු ලබයි!',
        keyVocabulary: [
          { word: 'apprentice', phonetic: '/əˈprentɪs/', sinhalaMeaning: 'ආධුනිකයා / පුහුණුවන්නා', englishDefinition: 'A person learning a skilled trade from an expert', partOfSpeech: 'noun' },
          { word: 'pendulum', phonetic: '/ˈpendjələm/', sinhalaMeaning: 'පෙන්ඩුලම / පැද්දෙන බර', englishDefinition: 'A weight hung from a fixed point so it swings freely', partOfSpeech: 'noun' },
          { word: 'twisting', phonetic: '/ˈtwɪstɪŋ/', sinhalaMeaning: 'වක්‍රාකාර / කැරකි කැරකි යන', englishDefinition: 'Curving and winding in spiral shape', partOfSpeech: 'adjective' },
          { word: 'brass', phonetic: '/brɑːs/', sinhalaMeaning: 'පිත්තල', englishDefinition: 'A yellow alloy of copper and zinc', partOfSpeech: 'noun' },
          { word: 'mysterious', phonetic: '/mɪˈstɪəriəs/', sinhalaMeaning: 'අබිරහස් / විස්මිත', englishDefinition: 'Difficult or impossible to understand or explain', partOfSpeech: 'adjective' },
          { word: 'echoed', phonetic: '/ˈekəʊd/', sinhalaMeaning: 'ප්‍රතිරාවය වුණා', englishDefinition: 'Resounded or repeated as an echo', partOfSpeech: 'verb' }
        ],
        sentences: [
          {
            id: 'cm1-1',
            englishText: 'High above the cobblestone streets of Riverbend stood the great Clock Tower of Master Bennett.',
            sinhalaTranslation: 'රිවර්බෙන්ඩ් නගරයේ ගල් ඇතිරූ වීදිවලට ඉහළින්, මාස්ටර් බෙනට්ගේ මහා ඔරලෝසු කුලුන උසට විරාජමානව පැවතුණා.',
            words: [
              { cleanWord: 'high', displayWord: 'High' },
              { cleanWord: 'above', displayWord: 'above' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'cobblestone', displayWord: 'cobblestone', vocab: { word: 'cobblestone', phonetic: '/ˈkɒblstəʊn/', sinhalaMeaning: 'වීදිවල අතුරා ඇති ගල් කැට', englishDefinition: 'Small rounded stones used for paving roads', partOfSpeech: 'noun' } },
              { cleanWord: 'streets', displayWord: 'streets' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'riverbend', displayWord: 'Riverbend' },
              { cleanWord: 'stood', displayWord: 'stood' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'great', displayWord: 'great' },
              { cleanWord: 'clock', displayWord: 'Clock' },
              { cleanWord: 'tower', displayWord: 'Tower', vocab: { word: 'tower', phonetic: '/ˈtaʊə/', sinhalaMeaning: 'කුලුන', englishDefinition: 'A tall narrow building or structure', partOfSpeech: 'noun' } },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'master', displayWord: 'Master' },
              { cleanWord: 'bennett', displayWord: 'Bennett.' }
            ]
          },
          {
            id: 'cm1-2',
            englishText: 'Every villager relied on its deep bronze bells to wake up for school, work, and cheerful harvest festivals.',
            sinhalaTranslation: 'පාසල් යාමට, රැකියාවට යාමට සහ අස්වනු උත්සව සඳහා අවදි වීමට ගමේ සැමදෙනාම එහි ගැඹුරු ලෝකඩ සීනු නාදය කෙරෙහි විශ්වාසය තැබුවා.',
            words: [
              { cleanWord: 'every', displayWord: 'Every' },
              { cleanWord: 'villager', displayWord: 'villager', vocab: { word: 'villager', phonetic: '/ˈvɪlɪdʒə/', sinhalaMeaning: 'ගම්වැසියා', englishDefinition: 'A resident living in a village', partOfSpeech: 'noun' } },
              { cleanWord: 'relied', displayWord: 'relied', vocab: { word: 'relied', phonetic: '/rɪˈlaɪd/', sinhalaMeaning: 'විශ්වාසය තැබුවා / යැපුණා', englishDefinition: 'Depended on with trust', partOfSpeech: 'verb' } },
              { cleanWord: 'on', displayWord: 'on' },
              { cleanWord: 'its', displayWord: 'its' },
              { cleanWord: 'deep', displayWord: 'deep' },
              { cleanWord: 'bronze', displayWord: 'bronze', vocab: { word: 'bronze', phonetic: '/brɒnz/', sinhalaMeaning: 'ලෝකඩ', englishDefinition: 'A strong yellowish-brown metallic alloy', partOfSpeech: 'noun' } },
              { cleanWord: 'bells', displayWord: 'bells' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'wake', displayWord: 'wake' },
              { cleanWord: 'up', displayWord: 'up' },
              { cleanWord: 'for', displayWord: 'for' },
              { cleanWord: 'school', displayWord: 'school,' },
              { cleanWord: 'work', displayWord: 'work,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'cheerful', displayWord: 'cheerful' },
              { cleanWord: 'harvest', displayWord: 'harvest', vocab: { word: 'harvest', phonetic: '/ˈhɑːvɪst/', sinhalaMeaning: 'අස්වැන්න', englishDefinition: 'Gathering of crops in autumn', partOfSpeech: 'noun' } },
              { cleanWord: 'festivals', displayWord: 'festivals.', vocab: { word: 'festivals', phonetic: '/ˈfestɪvlz/', sinhalaMeaning: 'උත්සව', englishDefinition: 'Celebrations with feast and joy', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'cm1-3',
            englishText: 'Leo, a curious fourteen-year-old apprentice, was polishing copper gears when the giant pendulum suddenly stopped.',
            sinhalaTranslation: 'කුතුහලයෙන් පිරි දහහතර හැවිරිදි ආධුනිකයෙකු වූ ලියෝ තඹ දැති රෝද පිරිසිදු කරමින් සිටියදී, මහා පෙන්ඩුලම එකවරම නතර වුණා.',
            words: [
              { cleanWord: 'leo', displayWord: 'Leo,' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'curious', displayWord: 'curious', vocab: { word: 'curious', phonetic: '/ˈkjʊəriəs/', sinhalaMeaning: 'කුතුහලය දනවන / දැනගැනීමට කැමති', englishDefinition: 'Eager to know or learn something new', partOfSpeech: 'adjective' } },
              { cleanWord: 'fourteen-year-old', displayWord: 'fourteen-year-old' },
              { cleanWord: 'apprentice', displayWord: 'apprentice,', vocab: { word: 'apprentice', phonetic: '/əˈprentɪs/', sinhalaMeaning: 'ශිල්ප හදාරන ආධුනිකයා', englishDefinition: 'A learner training under a master', partOfSpeech: 'noun' } },
              { cleanWord: 'was', displayWord: 'was' },
              { cleanWord: 'polishing', displayWord: 'polishing', vocab: { word: 'polishing', phonetic: '/ˈpɒlɪʃɪŋ/', sinhalaMeaning: 'දිලිසෙන සේ පිසදමමින්', englishDefinition: 'Making smooth and shiny by rubbing', partOfSpeech: 'verb' } },
              { cleanWord: 'copper', displayWord: 'copper', vocab: { word: 'copper', phonetic: '/ˈkɒpə/', sinhalaMeaning: 'තඹ', englishDefinition: 'Red-brown malleable metal', partOfSpeech: 'noun' } },
              { cleanWord: 'gears', displayWord: 'gears,', vocab: { word: 'gears', phonetic: '/ɡɪəz/', sinhalaMeaning: 'දැති රෝද', englishDefinition: 'Toothed wheels that work together', partOfSpeech: 'noun' } },
              { cleanWord: 'when', displayWord: 'when' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'giant', displayWord: 'giant' },
              { cleanWord: 'pendulum', displayWord: 'pendulum', vocab: { word: 'pendulum', phonetic: '/ˈpendjələm/', sinhalaMeaning: 'පෙන්ඩුලම', englishDefinition: 'Swinging weight in a clock', partOfSpeech: 'noun' } },
              { cleanWord: 'suddenly', displayWord: 'suddenly' },
              { cleanWord: 'stopped', displayWord: 'stopped.' }
            ]
          },
          {
            id: 'cm1-4',
            englishText: 'The heavy golden clock hands hesitated for a second, shuddered violently, and then began rotating backwards!',
            sinhalaTranslation: 'බරැති රන්වන් ඔරලෝසු කටු තත්පරයකට පැකිලී, දැඩි ලෙස සෙලවී, අනතුරුව පසුපසට කැරකෙන්නට පටන් ගත්තා!',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'heavy', displayWord: 'heavy' },
              { cleanWord: 'golden', displayWord: 'golden' },
              { cleanWord: 'clock', displayWord: 'clock' },
              { cleanWord: 'hands', displayWord: 'hands' },
              { cleanWord: 'hesitated', displayWord: 'hesitated', vocab: { word: 'hesitated', phonetic: '/ˈhezɪteɪtɪd/', sinhalaMeaning: 'පැකිළුණා / මඳක් නැවතුණා', englishDefinition: 'Paused before doing something', partOfSpeech: 'verb' } },
              { cleanWord: 'for', displayWord: 'for' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'second', displayWord: 'second,' },
              { cleanWord: 'shuddered', displayWord: 'shuddered', vocab: { word: 'shuddered', phonetic: '/ˈʃʌdəd/', sinhalaMeaning: 'දැඩි ලෙස සෙලවුණා / වෙව්ලුවා', englishDefinition: 'Shook violently with a tremor', partOfSpeech: 'verb' } },
              { cleanWord: 'violently', displayWord: 'violently,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'then', displayWord: 'then' },
              { cleanWord: 'began', displayWord: 'began' },
              { cleanWord: 'rotating', displayWord: 'rotating', vocab: { word: 'rotating', phonetic: '/rəʊˈteɪtɪŋ/', sinhalaMeaning: 'කැරකෙමින්', englishDefinition: 'Spinning around an axis', partOfSpeech: 'verb' } },
              { cleanWord: 'backwards', displayWord: 'backwards!', vocab: { word: 'backwards', phonetic: '/ˈbækwədz/', sinhalaMeaning: 'පසුපස දෙසට', englishDefinition: 'In the direction opposite to the usual way', partOfSpeech: 'adverb' } }
            ]
          },
          {
            id: 'cm1-5',
            englishText: 'A strange musical whirring sound echoed through the wooden rafters, calling Leo up into the dark bell chamber.',
            sinhalaTranslation: 'ලී බාල්ක අතරින් අමුතු සංගීතමය හඬක් ප්‍රතිරාවය වෙමින්, අඳුරු සීනු කුටිය වෙත ලියෝව කැඳවාගත්තා.',
            words: [
              { cleanWord: 'a', displayWord: 'A' },
              { cleanWord: 'strange', displayWord: 'strange' },
              { cleanWord: 'musical', displayWord: 'musical' },
              { cleanWord: 'whirring', displayWord: 'whirring', vocab: { word: 'whirring', phonetic: '/ˈwɜːrɪŋ/', sinhalaMeaning: 'දැති රෝද කැරකෙන හඬ', englishDefinition: 'Making a rapid humming sound', partOfSpeech: 'adjective' } },
              { cleanWord: 'sound', displayWord: 'sound' },
              { cleanWord: 'echoed', displayWord: 'echoed', vocab: { word: 'echoed', phonetic: '/ˈekəʊd/', sinhalaMeaning: 'ප්‍රතිරාවය වුණා', englishDefinition: 'Resounded through space', partOfSpeech: 'verb' } },
              { cleanWord: 'through', displayWord: 'through' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'wooden', displayWord: 'wooden' },
              { cleanWord: 'rafters', displayWord: 'rafters,', vocab: { word: 'rafters', phonetic: '/ˈrɑːftəz/', sinhalaMeaning: 'වහලයේ ලී බාල්ක', englishDefinition: 'Internal beams supporting a roof', partOfSpeech: 'noun' } },
              { cleanWord: 'calling', displayWord: 'calling' },
              { cleanWord: 'leo', displayWord: 'Leo' },
              { cleanWord: 'up', displayWord: 'up' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'dark', displayWord: 'dark' },
              { cleanWord: 'bell', displayWord: 'bell' },
              { cleanWord: 'chamber', displayWord: 'chamber.', vocab: { word: 'chamber', phonetic: '/ˈtʃeɪmbə/', sinhalaMeaning: 'කුටිය / කාමරය', englishDefinition: 'A large secluded room', partOfSpeech: 'noun' } }
            ]
          }
        ]
      },
      {
        id: 'cm-ch2',
        chapterNumber: 2,
        titleEn: 'The Silver Sparrow of Time',
        titleSi: 'කාලයේ රිදී ගේ කුරුල්ලා',
        subtitleEn: 'Healing the heart of the tower',
        subtitleSi: 'කුලුනේ හදවත සුවපත් කිරීම',
        summaryEn: 'Leo discovers a mechanical silver sparrow trapped in the main wheel, and learns that even the strongest gears need gentle care.',
        summarySi: 'ප්‍රධාන දැති රෝදය තුළ සිරවී සිටි රිදී කුරුල්ලා ලියෝ බේරාගෙන, ශක්තිමත්ම යාන්ත්‍රණයටද ආදරය අවශ්‍ය බව වටහා ගනී.',
        funFactEn: 'The world’s oldest working mechanical clock was built in Salisbury Cathedral in 1386!',
        funFactSi: 'ලොව පැරණිතම ක්‍රියාකාරී යාන්ත්‍රික ඔරලෝසුව 1386 දී සැලිස්බරි ආසන දෙව්මැදුරේ ඉදිකරන ලද්දකි!',
        keyVocabulary: [
          { word: 'delicate', phonetic: '/ˈdelɪkət/', sinhalaMeaning: 'සියුම් / පහසුවෙන් හානි විය හැකි', englishDefinition: 'Fine in structure; easily broken', partOfSpeech: 'adjective' },
          { word: 'trapped', phonetic: '/træpt/', sinhalaMeaning: 'සිරවූ / කොටු වූ', englishDefinition: 'Caught and unable to escape', partOfSpeech: 'adjective' },
          { word: 'tweezers', phonetic: '/ˈtwiːzəz/', sinhalaMeaning: 'අඬුව / කරකැවිල්ල', englishDefinition: 'Small precision pinchers for grasping tiny objects', partOfSpeech: 'noun' },
          { word: 'ticking', phonetic: '/ˈtɪkɪŋ/', sinhalaMeaning: 'ටික් ටික් නාදය', englishDefinition: 'Regular clicking sound of a clock', partOfSpeech: 'noun' },
          { word: 'harmony', phonetic: '/ˈhɑːməni/', sinhalaMeaning: 'සමගිය / එකඟතාවය', englishDefinition: 'Agreement and smooth cooperation', partOfSpeech: 'noun' },
          { word: 'cherished', phonetic: '/ˈtʃerɪʃt/', sinhalaMeaning: 'මහත් සේ අගය කළ', englishDefinition: 'Loved and protected with great affection', partOfSpeech: 'verb' }
        ],
        sentences: [
          {
            id: 'cm2-1',
            englishText: 'Holding his glowing oil lamp tightly, Leo climbed eighty spiral oak steps to the topmost platform.',
            sinhalaTranslation: 'සිය දිලිසෙන තෙල් පහන තදින් අල්ලාගත් ලියෝ, ඉහළම වේදිකාව දෙසට ඕක් ලීයෙන් කළ වටකුරු පඩිපෙළේ පඩි අසූවක් ඉහළට නැග්ගා.',
            words: [
              { cleanWord: 'holding', displayWord: 'Holding' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'glowing', displayWord: 'glowing' },
              { cleanWord: 'oil', displayWord: 'oil' },
              { cleanWord: 'lamp', displayWord: 'lamp' },
              { cleanWord: 'tightly', displayWord: 'tightly,', vocab: { word: 'tightly', phonetic: '/ˈtaɪtli/', sinhalaMeaning: 'තදින්', englishDefinition: 'Firmly and securely', partOfSpeech: 'adverb' } },
              { cleanWord: 'leo', displayWord: 'Leo' },
              { cleanWord: 'climbed', displayWord: 'climbed' },
              { cleanWord: 'eighty', displayWord: 'eighty' },
              { cleanWord: 'spiral', displayWord: 'spiral', vocab: { word: 'spiral', phonetic: '/ˈspaɪrəl/', sinhalaMeaning: 'වටකුරු / සර්පිලාකාර', englishDefinition: 'Winding around a central point', partOfSpeech: 'adjective' } },
              { cleanWord: 'oak', displayWord: 'oak', vocab: { word: 'oak', phonetic: '/əʊk/', sinhalaMeaning: 'ඕක් ගස', englishDefinition: 'A large tree yielding hard wood', partOfSpeech: 'noun' } },
              { cleanWord: 'steps', displayWord: 'steps' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'topmost', displayWord: 'topmost', vocab: { word: 'topmost', phonetic: '/ˈtɒpməʊst/', sinhalaMeaning: 'ඉහළින්ම පිහිටි', englishDefinition: 'Highest in place or position', partOfSpeech: 'adjective' } },
              { cleanWord: 'platform', displayWord: 'platform.', vocab: { word: 'platform', phonetic: '/ˈplætfɔːm/', sinhalaMeaning: 'වේදිකාව / තට්ටුව', englishDefinition: 'A raised level surface', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'cm2-2',
            englishText: 'Between the teeth of the master escapement wheel sat a tiny bird crafted entirely from polished silver.',
            sinhalaTranslation: 'ප්‍රධාන එස්කේප්මන්ට් දැති රෝදයේ දැති අතර, ඔප දැමූ රිදීයෙන් මුළුමනින්ම නිමවූ කුඩා කුරුල්ලෙක් වාඩි වී සිටියා.',
            words: [
              { cleanWord: 'between', displayWord: 'Between' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'teeth', displayWord: 'teeth' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'master', displayWord: 'master' },
              { cleanWord: 'escapement', displayWord: 'escapement' },
              { cleanWord: 'wheel', displayWord: 'wheel' },
              { cleanWord: 'sat', displayWord: 'sat' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'bird', displayWord: 'bird' },
              { cleanWord: 'crafted', displayWord: 'crafted', vocab: { word: 'crafted', phonetic: '/ˈkrɑːftɪd/', sinhalaMeaning: 'නිපදවන ලද / අත්කමින් කළ', englishDefinition: 'Made skillfully by hand', partOfSpeech: 'verb' } },
              { cleanWord: 'entirely', displayWord: 'entirely', vocab: { word: 'entirely', phonetic: '/ɪnˈtaɪəli/', sinhalaMeaning: 'සම්පූර්ණයෙන්ම', englishDefinition: 'Completely without exception', partOfSpeech: 'adverb' } },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'polished', displayWord: 'polished' },
              { cleanWord: 'silver', displayWord: 'silver.' }
            ]
          },
          {
            id: 'cm2-3',
            englishText: 'A thin ribbon from a holiday celebration was caught tightly around the bird’s spring-loaded wing.',
            sinhalaTranslation: 'උත්සවයකින් ගසාගෙන ආ සිහින් රිබන් පටියක් කුරුල්ලාගේ ස්ප්‍රිං පියාපත වටා තදින් පැටලී තිබුණා.',
            words: [
              { cleanWord: 'a', displayWord: 'A' },
              { cleanWord: 'thin', displayWord: 'thin' },
              { cleanWord: 'ribbon', displayWord: 'ribbon', vocab: { word: 'ribbon', phonetic: '/ˈrɪbən/', sinhalaMeaning: 'රිබන් පටිය', englishDefinition: 'A narrow strip of fabric used for decoration', partOfSpeech: 'noun' } },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'holiday', displayWord: 'holiday' },
              { cleanWord: 'celebration', displayWord: 'celebration' },
              { cleanWord: 'was', displayWord: 'was' },
              { cleanWord: 'caught', displayWord: 'caught', vocab: { word: 'caught', phonetic: '/kɔːt/', sinhalaMeaning: 'හසුවී / පැටලී', englishDefinition: 'Trapped or entangled', partOfSpeech: 'verb' } },
              { cleanWord: 'tightly', displayWord: 'tightly' },
              { cleanWord: 'around', displayWord: 'around' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'birds', displayWord: 'bird’s' },
              { cleanWord: 'spring-loaded', displayWord: 'spring-loaded', vocab: { word: 'spring-loaded', phonetic: '/ˈsprɪŋ ləʊdɪd/', sinhalaMeaning: 'ස්ප්‍රිං ආධාරයෙන් ක්‍රියාකරන', englishDefinition: 'Powered or pushed by a coiled metal spring', partOfSpeech: 'adjective' } },
              { cleanWord: 'wing', displayWord: 'wing.' }
            ]
          },
          {
            id: 'cm2-4',
            englishText: 'With patient hands and brass tweezers, Leo gently freed the little silver bird and oiled its sapphire pivot.',
            sinhalaTranslation: 'ඉවසීමෙන් පිරි දෑතින් සහ පිත්තල අඬුව උපයෝගී කරගනිමින්, ලියෝ කුඩා රිදී කුරුල්ලා නිදහස් කර එහි නිල් මැණික් කූඩුවට තෙල් දැමුවා.',
            words: [
              { cleanWord: 'with', displayWord: 'With' },
              { cleanWord: 'patient', displayWord: 'patient', vocab: { word: 'patient', phonetic: '/ˈpeɪʃnt/', sinhalaMeaning: 'ඉවසිලිවන්ත', englishDefinition: 'Able to endure delay without getting angry', partOfSpeech: 'adjective' } },
              { cleanWord: 'hands', displayWord: 'hands' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'brass', displayWord: 'brass' },
              { cleanWord: 'tweezers', displayWord: 'tweezers,', vocab: { word: 'tweezers', phonetic: '/ˈtwiːzəz/', sinhalaMeaning: 'අඬුව / කරකැවිල්ල', englishDefinition: 'Small tool for grasping tiny items', partOfSpeech: 'noun' } },
              { cleanWord: 'leo', displayWord: 'Leo' },
              { cleanWord: 'gently', displayWord: 'gently' },
              { cleanWord: 'freed', displayWord: 'freed', vocab: { word: 'freed', phonetic: '/friːd/', sinhalaMeaning: 'නිදහස් කළා', englishDefinition: 'Released from confinement', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'little', displayWord: 'little' },
              { cleanWord: 'silver', displayWord: 'silver' },
              { cleanWord: 'bird', displayWord: 'bird' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'oiled', displayWord: 'oiled', vocab: { word: 'oiled', phonetic: '/ɔɪld/', sinhalaMeaning: 'තෙල් දැමුවා', englishDefinition: 'Lubricated with fine oil', partOfSpeech: 'verb' } },
              { cleanWord: 'its', displayWord: 'its' },
              { cleanWord: 'sapphire', displayWord: 'sapphire', vocab: { word: 'sapphire', phonetic: '/ˈsæfaɪə/', sinhalaMeaning: 'නිල් මැණික්', englishDefinition: 'A precious transparent blue gemstone', partOfSpeech: 'noun' } },
              { cleanWord: 'pivot', displayWord: 'pivot.', vocab: { word: 'pivot', phonetic: '/ˈpɪvət/', sinhalaMeaning: 'කේන්ද්‍ර කූඩුව / කරකැවෙන අක්ෂය', englishDefinition: 'The central pin on which something turns', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'cm2-5',
            englishText: 'The sparrow chirped three clear bell tones, the great pendulum resumed its steady rhythm, and morning sun bathed the valley in gold.',
            sinhalaTranslation: 'කුරුල්ලා පැහැදිලි සීනු නාද තුනක් නඟා නාද කළ අතර, මහා පෙන්ඩුලම සිය ස්ථාවර රිද්මයට පැමිණ, උදෑසන හිරු එළිය නිම්නය රන් පැහැයෙන් නැහැවූවා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'sparrow', displayWord: 'sparrow', vocab: { word: 'sparrow', phonetic: '/ˈspærəʊ/', sinhalaMeaning: 'ගේ කුරුල්ලා', englishDefinition: 'A small brownish-grey songbird', partOfSpeech: 'noun' } },
              { cleanWord: 'chirped', displayWord: 'chirped', vocab: { word: 'chirped', phonetic: '/tʃɜːpt/', sinhalaMeaning: 'නාද කළා / කිචිබිචි ගෑවා', englishDefinition: 'Made a short high-pitched sound', partOfSpeech: 'verb' } },
              { cleanWord: 'three', displayWord: 'three' },
              { cleanWord: 'clear', displayWord: 'clear' },
              { cleanWord: 'bell', displayWord: 'bell' },
              { cleanWord: 'tones', displayWord: 'tones,' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'great', displayWord: 'great' },
              { cleanWord: 'pendulum', displayWord: 'pendulum' },
              { cleanWord: 'resumed', displayWord: 'resumed', vocab: { word: 'resumed', phonetic: '/rɪˈzjuːmd/', sinhalaMeaning: 'නැවත ආරම්භ කළා', englishDefinition: 'Began again after a pause', partOfSpeech: 'verb' } },
              { cleanWord: 'its', displayWord: 'its' },
              { cleanWord: 'steady', displayWord: 'steady', vocab: { word: 'steady', phonetic: '/ˈstedi/', sinhalaMeaning: 'ස්ථාවර / නොවෙනස් වන', englishDefinition: 'Regular, continuous, and reliable', partOfSpeech: 'adjective' } },
              { cleanWord: 'rhythm', displayWord: 'rhythm,', vocab: { word: 'rhythm', phonetic: '/ˈrɪðəm/', sinhalaMeaning: 'රිද්මය / තාලය', englishDefinition: 'A strong regular repeated pattern of movement or sound', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'morning', displayWord: 'morning' },
              { cleanWord: 'sun', displayWord: 'sun' },
              { cleanWord: 'bathed', displayWord: 'bathed', vocab: { word: 'bathed', phonetic: '/beɪðd/', sinhalaMeaning: 'නැහැවුවා / එළිය කළා', englishDefinition: 'Covered or immersed in warm light', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'valley', displayWord: 'valley', vocab: { word: 'valley', phonetic: '/ˈvæli/', sinhalaMeaning: 'නිම්නය', englishDefinition: 'Low area between hills or mountains', partOfSpeech: 'noun' } },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'gold', displayWord: 'gold.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'elephant-flute',
    categoryId: 'nature',
    categoryTitleEn: '2. Nature & Wildlife',
    categoryTitleSi: 'සොබාදහම සහ වනජීවී',
    titleEn: 'The Whispering Flute of the Teak Forest',
    titleSi: 'තේක්ක වනාන්තරයේ මුමුණන බටනළාව',
    level: 'Intermediate (B1)',
    genreEn: 'Wild Nature & Compassion',
    genreSi: 'වනජීවී සෙනෙහස සහ කරුණාව',
    estimatedMinutes: 7,
    coverAccent: '#059669',
    coverImage: forestFluteCover,
    theme: 'adventure',
    quiz: [
      {
        id: 'ef-q1',
        questionEn: 'Why did the wild elephant Raja stop charging toward Kasun?',
        questionSi: 'රාජා නම් වන අලියා කසුන් දෙසට කඩාගෙන ඒම නැවැත්වූයේ ඇයි?',
        options: ['Kasun played a calm, peaceful tune on his bamboo flute', 'Kasun climbed to the top of a giant rock', 'A loud thunderstorm frightened the animal away'],
        optionsSi: ['කසුන් සිය උණ බටනළාවෙන් ඉතා සන්සුන් මිහිරි තනුවක් වැයීම නිසා', 'කසුන් විශාල ගල් පර්වතයක් මුදුනට නැඟීම නිසා', 'තද ගිගුරුම් සහිත වැස්ස නිසා සත්වයා බියවී දිවයාම නිසා'],
        correctIndex: 0,
        explanationSi: 'කසුන් බටනළාවෙන් සන්සුන් සංගීතයක් වැයූ විට රාජා කන් පහත් කර සන්සුන්ව එයට සවන් දුන්නේය.'
      },
      {
        id: 'ef-q2',
        questionEn: 'How did Kasun and Raja save the young deer during the monsoon?',
        questionSi: 'වර්ෂා කාලයේදී කසුන් සහ රාජා කුඩා මුව පැටවාව බේරාගත්තේ කෙසේද?',
        options: ['Raja used his strong trunk to lift the deer from the rushing muddy river', 'They built a wooden raft across the deep lake', 'The village rangers brought a motorboat'],
        optionsSi: ['රාජා සිය ශක්තිමත් හොඬවැලෙන් මඩ සහිත ගඟෙන් මුව පැටවාව ඔසවා ගොඩට ගැනීමෙන්', 'ඔවුන් ගැඹුරු විල හරහා ලී පහුරක් තැනීමෙන්', 'වනජීවී නිලධාරීන් මෝටර් බෝට්ටුවක් ගෙන ඒමෙන්'],
        correctIndex: 0,
        explanationSi: 'රාජා සිය දිගු හොඬවැල (powerful trunk) යොදවා වේගයෙන් ගලන ජලයෙන් මුව පැටවා ආරක්ෂිතව ඔසවා ගත්තේය.'
      }
    ],
    chapters: [
      {
        id: 'ef-ch1',
        chapterNumber: 1,
        titleEn: 'The Encounter in the Mist',
        titleSi: 'මීදුම මැද මුහුණට මුහුණ හමුවීම',
        subtitleEn: 'Music that calms the wildest heart',
        subtitleSi: 'වනගත සිතක් සනසාලූ සංගීතය',
        summaryEn: 'Near the border of an ancient forest reserve, young Kasun encounters a solitary wild elephant and discovers the power of peaceful melody.',
        summarySi: 'පැරණි රක්ෂිත මායිමේදී කසුන් හුදෙකලා අලියෙකුට මුණගැසී, සාමකාමී සංගීතයේ බලය වටහා ගනී.',
        funFactEn: 'Asian elephants communicate through low-frequency rumbles that can travel up to several miles through the ground!',
        funFactSi: 'ආසියානු අලි ඇතුන් පොළොව හරහා සැතපුම් කිහිපයක් දුරට ගමන් කළ හැකි අඩු සංඛ්‍යාත ශබ්ද (infrasound) මඟින් සන්නිවේදනය කරයි!',
        keyVocabulary: [
          { word: 'sanctuary', phonetic: '/ˈsæŋktʃuəri/', sinhalaMeaning: 'අභයභූමිය / රක්ෂිතය', englishDefinition: 'A protected nature reserve for animals', partOfSpeech: 'noun' },
          { word: 'solitary', phonetic: '/ˈsɒlətri/', sinhalaMeaning: 'හුදෙකලා වූ', englishDefinition: 'Existing or living alone without companions', partOfSpeech: 'adjective' },
          { word: 'flute', phonetic: '/fluːt/', sinhalaMeaning: 'බටනළාව', englishDefinition: 'A wind instrument made from a hollow tube', partOfSpeech: 'noun' },
          { word: 'melody', phonetic: '/ˈmelədi/', sinhalaMeaning: 'මිහිරි තනුව', englishDefinition: 'A sequence of pleasant musical notes', partOfSpeech: 'noun' },
          { word: 'charging', phonetic: '/ˈtʃɑːdʒɪŋ/', sinhalaMeaning: 'කඩාගෙන පැනීම / දිව ඒම', englishDefinition: 'Rushing forward in an attack', partOfSpeech: 'verb' },
          { word: 'trembled', phonetic: '/ˈtrembld/', sinhalaMeaning: 'වෙව්ලුවා / බියෙන් සෙලවුණා', englishDefinition: 'Shook involuntarily with fear or emotion', partOfSpeech: 'verb' }
        ],
        sentences: [
          {
            id: 'ef1-1',
            englishText: 'Kasun lived with his grandfather at the quiet border of the vast Minneriya teak forest.',
            sinhalaTranslation: 'කසුන් සිය සීයා සමඟ විසුවේ මහා මින්නේරිය තේක්ක වනාන්තරයේ නිස්කලංක මායිමේ පිහිටි නිවසකය.',
            words: [
              { cleanWord: 'kasun', displayWord: 'Kasun' },
              { cleanWord: 'lived', displayWord: 'lived' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'grandfather', displayWord: 'grandfather' },
              { cleanWord: 'at', displayWord: 'at' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'quiet', displayWord: 'quiet' },
              { cleanWord: 'border', displayWord: 'border,', vocab: { word: 'border', phonetic: '/ˈbɔːdə/', sinhalaMeaning: 'මායිම', englishDefinition: 'The boundary dividing two territories', partOfSpeech: 'noun' } },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'vast', displayWord: 'vast', vocab: { word: 'vast', phonetic: '/vɑːst/', sinhalaMeaning: 'ඉතා විශාල / අතිමහත්', englishDefinition: 'Immense in size and extent', partOfSpeech: 'adjective' } },
              { cleanWord: 'minneriya', displayWord: 'Minneriya' },
              { cleanWord: 'teak', displayWord: 'teak', vocab: { word: 'teak', phonetic: '/tiːk/', sinhalaMeaning: 'තේක්ක ගස්', englishDefinition: 'Hard durable tropical hardwood tree', partOfSpeech: 'noun' } },
              { cleanWord: 'forest', displayWord: 'forest.' }
            ]
          },
          {
            id: 'ef1-2',
            englishText: 'His most prized possession was a smooth bamboo flute carved lovingly by his late uncle.',
            sinhalaTranslation: 'ඔහු සතු වූ වටිනාම වස්තුව වූයේ ඔහුගේ නැසීගිය මාමා විසින් ආදරයෙන් කැටයම් කරන ලද සිනිඳු උණ බටනළාවයි.',
            words: [
              { cleanWord: 'his', displayWord: 'His' },
              { cleanWord: 'most', displayWord: 'most' },
              { cleanWord: 'prized', displayWord: 'prized', vocab: { word: 'prized', phonetic: '/praɪzd/', sinhalaMeaning: 'අගය කරන ලද / ඉතා වටිනා', englishDefinition: 'Treasured and valued highly', partOfSpeech: 'adjective' } },
              { cleanWord: 'possession', displayWord: 'possession', vocab: { word: 'possession', phonetic: '/pəˈzeʃn/', sinhalaMeaning: 'අයිතිය / වස්තුව', englishDefinition: 'An item owned by someone', partOfSpeech: 'noun' } },
              { cleanWord: 'was', displayWord: 'was' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'smooth', displayWord: 'smooth' },
              { cleanWord: 'bamboo', displayWord: 'bamboo', vocab: { word: 'bamboo', phonetic: '/bæmˈbuː/', sinhalaMeaning: 'උණ ගස', englishDefinition: 'Giant woody grass with hollow stems', partOfSpeech: 'noun' } },
              { cleanWord: 'flute', displayWord: 'flute', vocab: { word: 'flute', phonetic: '/fluːt/', sinhalaMeaning: 'බටනළාව', englishDefinition: 'Wind music instrument', partOfSpeech: 'noun' } },
              { cleanWord: 'carved', displayWord: 'carved', vocab: { word: 'carved', phonetic: '/kɑːvd/', sinhalaMeaning: 'කැටයම් කරන ලද', englishDefinition: 'Shaped by cutting with a blade', partOfSpeech: 'verb' } },
              { cleanWord: 'lovingly', displayWord: 'lovingly' },
              { cleanWord: 'by', displayWord: 'by' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'late', displayWord: 'late' },
              { cleanWord: 'uncle', displayWord: 'uncle.' }
            ]
          },
          {
            id: 'ef1-3',
            englishText: 'One misty dusk while gathering firewood, the dense bamboo bushes broke open with a deafening crash.',
            sinhalaTranslation: 'එක් මීදුම් සහිත සැඳෑවක දර එකතු කරමින් සිටියදී, ඝන උණ පඳුරු කඩාගෙන මහත් ඝෝෂාවක් ඇසුණා.',
            words: [
              { cleanWord: 'one', displayWord: 'One' },
              { cleanWord: 'misty', displayWord: 'misty' },
              { cleanWord: 'dusk', displayWord: 'dusk,', vocab: { word: 'dusk', phonetic: '/dʌsk/', sinhalaMeaning: 'ඉර බසින සැඳෑ යාමය', englishDefinition: 'The darker stage of twilight before night', partOfSpeech: 'noun' } },
              { cleanWord: 'while', displayWord: 'while' },
              { cleanWord: 'gathering', displayWord: 'gathering' },
              { cleanWord: 'firewood', displayWord: 'firewood,', vocab: { word: 'firewood', phonetic: '/ˈfaɪəwʊd/', sinhalaMeaning: 'දර', englishDefinition: 'Wood collected to be burned on a fire', partOfSpeech: 'noun' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'dense', displayWord: 'dense', vocab: { word: 'dense', phonetic: '/dens/', sinhalaMeaning: 'ඝන / ළඟින් පිහිටි', englishDefinition: 'Closely compacted in substance', partOfSpeech: 'adjective' } },
              { cleanWord: 'bamboo', displayWord: 'bamboo' },
              { cleanWord: 'bushes', displayWord: 'bushes' },
              { cleanWord: 'broke', displayWord: 'broke' },
              { cleanWord: 'open', displayWord: 'open' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'deafening', displayWord: 'deafening', vocab: { word: 'deafening', phonetic: '/ˈdefnɪŋ/', sinhalaMeaning: 'දෙසවන් බිහිරි කරවන', englishDefinition: 'So loud as to make it impossible to hear anything else', partOfSpeech: 'adjective' } },
              { cleanWord: 'crash', displayWord: 'crash.' }
            ]
          },
          {
            id: 'ef1-4',
            englishText: 'A massive tusker, known by local farmers as Raja, stepped into the clearing with flaring ears and raised trunk.',
            sinhalaTranslation: 'ප්‍රදේශයේ ගොවීන් රාජා නමින් හඳුන්වන මහා ඇතා, දෙකන් ගසමින් සහ හොඬවැල ඔසවමින් එළිමහනට පා තැබුවා.',
            words: [
              { cleanWord: 'a', displayWord: 'A' },
              { cleanWord: 'massive', displayWord: 'massive', vocab: { word: 'massive', phonetic: '/ˈmæsɪv/', sinhalaMeaning: 'විශාල / දැවැන්ත', englishDefinition: 'Extremely large and heavy', partOfSpeech: 'adjective' } },
              { cleanWord: 'tusker', displayWord: 'tusker,', vocab: { word: 'tusker', phonetic: '/ˈtʌskə/', sinhalaMeaning: 'ඇතා (දළ ඇති අලියා)', englishDefinition: 'A male elephant having large tusks', partOfSpeech: 'noun' } },
              { cleanWord: 'known', displayWord: 'known' },
              { cleanWord: 'by', displayWord: 'by' },
              { cleanWord: 'local', displayWord: 'local' },
              { cleanWord: 'farmers', displayWord: 'farmers' },
              { cleanWord: 'as', displayWord: 'as' },
              { cleanWord: 'raja', displayWord: 'Raja,' },
              { cleanWord: 'stepped', displayWord: 'stepped' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'clearing', displayWord: 'clearing,', vocab: { word: 'clearing', phonetic: '/ˈklɪərɪŋ/', sinhalaMeaning: 'වනයේ එළිමහන් බිම', englishDefinition: 'An open space in a forest', partOfSpeech: 'noun' } },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'flaring', displayWord: 'flaring', vocab: { word: 'flaring', phonetic: '/ˈfleərɪŋ/', sinhalaMeaning: 'පළල් කරමින් සෙලවෙන', englishDefinition: 'Spreading wide aggressively', partOfSpeech: 'adjective' } },
              { cleanWord: 'ears', displayWord: 'ears' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'raised', displayWord: 'raised' },
              { cleanWord: 'trunk', displayWord: 'trunk.', vocab: { word: 'trunk', phonetic: '/trʌŋk/', sinhalaMeaning: 'අලියාගේ හොඬවැල', englishDefinition: 'The elongated prehensile nose of an elephant', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'ef1-5',
            englishText: 'Instead of running in panic, Kasun closed his eyes, lifted his flute, and breathed a gentle, soothing ancient lullaby.',
            sinhalaTranslation: 'බියෙන් පලා යනවා වෙනුවට, කසුන් දෑස් පියාගෙන, සිය බටනළාව ඔසවා, මෘදු සහ සන්සුන් පැරණි නැළවිලි ගීතයක් වැයුවා.',
            words: [
              { cleanWord: 'instead', displayWord: 'Instead' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'running', displayWord: 'running' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'panic', displayWord: 'panic,', vocab: { word: 'panic', phonetic: '/ˈpænɪk/', sinhalaMeaning: 'කලබලය / දැඩි බිය', englishDefinition: 'Sudden uncontrollable fear', partOfSpeech: 'noun' } },
              { cleanWord: 'kasun', displayWord: 'Kasun' },
              { cleanWord: 'closed', displayWord: 'closed' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'eyes', displayWord: 'eyes,' },
              { cleanWord: 'lifted', displayWord: 'lifted' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'flute', displayWord: 'flute,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'breathed', displayWord: 'breathed' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'gentle', displayWord: 'gentle' },
              { cleanWord: 'soothing', displayWord: 'soothing', vocab: { word: 'soothing', phonetic: '/ˈsuːðɪŋ/', sinhalaMeaning: 'සිත සනසන / සුවදායක', englishDefinition: 'Having a calming effect on emotion', partOfSpeech: 'adjective' } },
              { cleanWord: 'ancient', displayWord: 'ancient' },
              { cleanWord: 'lullaby', displayWord: 'lullaby.', vocab: { word: 'lullaby', phonetic: '/ˈlʌləbaɪ/', sinhalaMeaning: 'නැළවිලි ගීතය', englishDefinition: 'A quiet song sung to calm or lull to sleep', partOfSpeech: 'noun' } }
            ]
          }
        ]
      },
      {
        id: 'ef-ch2',
        chapterNumber: 2,
        titleEn: 'The Rescue in the Swelling River',
        titleSi: 'ගලන ගඟ මැද කළ ගලවාගැනීම',
        subtitleEn: 'The bond of boy and giant',
        subtitleSi: 'පිරිමි ළමයා සහ යෝධයාගේ බැඳීම',
        summaryEn: 'When the monsoons flood the valley, Kasun and Raja work together to save a stranded young deer, proving that trust conquers fear.',
        summarySi: 'මෝසම් වැස්සෙන් නිම්නය යටවෙද්දී, කසුන් සහ රාජා එක්වී අසරණ වූ මුව පැටවෙකු බේරාගනී.',
        funFactEn: 'Elephants are excellent swimmers and can cross deep, turbulent rivers with their trunks acting like snorkels!',
        funFactSi: 'අලි ඇතුන් ඉතා දක්ෂ පිහිනුම්කරුවන් වන අතර ඔවුන්ගේ හොඬවැල ස්නෝකල් එකක් මෙන් යොදාගනිමින් ගැඹුරු ජලයේ පවා පිහිනයි!',
        keyVocabulary: [
          { word: 'monsoon', phonetic: '/mɒnˈsuːn/', sinhalaMeaning: 'මෝසම් වැස්ස', englishDefinition: 'A seasonal prevailing wind bringing heavy rain', partOfSpeech: 'noun' },
          { word: 'rushing', phonetic: '/ˈrʌʃɪŋ/', sinhalaMeaning: 'වේගයෙන් ගලායන', englishDefinition: 'Moving with urgent, rapid speed', partOfSpeech: 'adjective' },
          { word: 'stranded', phonetic: '/ˈstrændɪd/', sinhalaMeaning: 'අතරමං වූ / කොටුවූ', englishDefinition: 'Left in a helpless situation without transport', partOfSpeech: 'adjective' },
          { word: 'courage', phonetic: '/ˈkʌrɪdʒ/', sinhalaMeaning: 'ධෛර්යය', englishDefinition: 'Strength in the face of pain or grief', partOfSpeech: 'noun' },
          { word: 'companion', phonetic: '/kəmˈpæniən/', sinhalaMeaning: 'මිතුරා / සහකරුවා', englishDefinition: 'A person or animal with whom one spends time', partOfSpeech: 'noun' },
          { word: 'reverence', phonetic: '/ˈrevərəns/', sinhalaMeaning: 'ගෞරවය / භක්තිය', englishDefinition: 'Deep respect for someone or something', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'ef2-1',
            englishText: 'Hearing the sweet bamboo melody, Raja slowed his heavy steps, tilted his head, and gently rested his trunk on the earth.',
            sinhalaTranslation: 'මිහිරි උණ බටනළා නාදය ඇසූ රාජා, සිය බරැති පියවර මන්දගාමී කර, හිස මඳක් ඇලකර, සිය හොඬවැල සන්සුන්ව පොළොව මත තැබුවා.',
            words: [
              { cleanWord: 'hearing', displayWord: 'Hearing' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'sweet', displayWord: 'sweet' },
              { cleanWord: 'bamboo', displayWord: 'bamboo' },
              { cleanWord: 'melody', displayWord: 'melody,' },
              { cleanWord: 'raja', displayWord: 'Raja' },
              { cleanWord: 'slowed', displayWord: 'slowed' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'heavy', displayWord: 'heavy' },
              { cleanWord: 'steps', displayWord: 'steps,' },
              { cleanWord: 'tilted', displayWord: 'tilted', vocab: { word: 'tilted', phonetic: '/ˈtɪltɪd/', sinhalaMeaning: 'ඇල කළා', englishDefinition: 'Slanted into a sloping position', partOfSpeech: 'verb' } },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'head', displayWord: 'head,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'gently', displayWord: 'gently' },
              { cleanWord: 'rested', displayWord: 'rested' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'trunk', displayWord: 'trunk' },
              { cleanWord: 'on', displayWord: 'on' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'earth', displayWord: 'earth.' }
            ]
          },
          {
            id: 'ef2-2',
            englishText: 'Three weeks later, torrential monsoon rains flooded the rocky stream, turning it into a roaring muddy river.',
            sinhalaTranslation: 'සති තුනකට පසු, ඇදහැළුණු මෝසම් වැස්සෙන් ගල් සහිත දිය පහර පිටාර ගලා, එය ගොරවන මඩ ගඟක් බවට පත් වුණා.',
            words: [
              { cleanWord: 'three', displayWord: 'Three' },
              { cleanWord: 'weeks', displayWord: 'weeks' },
              { cleanWord: 'later', displayWord: 'later,' },
              { cleanWord: 'torrential', displayWord: 'torrential', vocab: { word: 'torrential', phonetic: '/təˈrenʃl/', sinhalaMeaning: 'ධාරානිපාත / තදින් ඇදහැලෙන', englishDefinition: 'Falling rapidly in copious quantities', partOfSpeech: 'adjective' } },
              { cleanWord: 'monsoon', displayWord: 'monsoon' },
              { cleanWord: 'rains', displayWord: 'rains' },
              { cleanWord: 'flooded', displayWord: 'flooded', vocab: { word: 'flooded', phonetic: '/ˈflʌdɪd/', sinhalaMeaning: 'ජලයෙන් යටවුණා', englishDefinition: 'Submerged with water', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'rocky', displayWord: 'rocky' },
              { cleanWord: 'stream', displayWord: 'stream,', vocab: { word: 'stream', phonetic: '/striːm/', sinhalaMeaning: 'දිය පහර', englishDefinition: 'A small narrow river', partOfSpeech: 'noun' } },
              { cleanWord: 'turning', displayWord: 'turning' },
              { cleanWord: 'it', displayWord: 'it' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'roaring', displayWord: 'roaring', vocab: { word: 'roaring', phonetic: '/ˈrɔːrɪŋ/', sinhalaMeaning: 'ගොරවන / ඝෝෂාකාරී', englishDefinition: 'Making a loud deep prolonged sound', partOfSpeech: 'adjective' } },
              { cleanWord: 'muddy', displayWord: 'muddy' },
              { cleanWord: 'river', displayWord: 'river.' }
            ]
          },
          {
            id: 'ef2-3',
            englishText: 'On a tiny sinking island of weeds in the middle of the torrent, a spotted baby deer stood trembling in panic.',
            sinhalaTranslation: 'සැඩ පහර මැද ගිලෙමින් පැවති කුඩා තෘණ දූපතක් මත, තිත් මුව පැටවෙක් බියෙන් වෙව්ලමින් සිටියා.',
            words: [
              { cleanWord: 'on', displayWord: 'On' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'sinking', displayWord: 'sinking', vocab: { word: 'sinking', phonetic: '/ˈsɪŋkɪŋ/', sinhalaMeaning: 'ගිලෙමින් පවතින', englishDefinition: 'Going down below the surface of liquid', partOfSpeech: 'adjective' } },
              { cleanWord: 'island', displayWord: 'island' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'weeds', displayWord: 'weeds' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'middle', displayWord: 'middle' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'torrent', displayWord: 'torrent,', vocab: { word: 'torrent', phonetic: '/ˈtɒrənt/', sinhalaMeaning: 'සැඩ ජල පහර', englishDefinition: 'A strong and fast-moving stream of water', partOfSpeech: 'noun' } },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'spotted', displayWord: 'spotted', vocab: { word: 'spotted', phonetic: '/ˈspɒtɪd/', sinhalaMeaning: 'තිත් සහිත', englishDefinition: 'Decorated with pattern of spots', partOfSpeech: 'adjective' } },
              { cleanWord: 'baby', displayWord: 'baby' },
              { cleanWord: 'deer', displayWord: 'deer', vocab: { word: 'deer', phonetic: '/dɪə/', sinhalaMeaning: 'මුවා', englishDefinition: 'A hoofed graceful mammal', partOfSpeech: 'noun' } },
              { cleanWord: 'stood', displayWord: 'stood' },
              { cleanWord: 'trembling', displayWord: 'trembling' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'panic', displayWord: 'panic.' }
            ]
          },
          {
            id: 'ef2-4',
            englishText: 'Kasun climbed onto the riverbank and played his rhythmic signaling melody, calling Raja through the thick wall of rain.',
            sinhalaTranslation: 'කසුන් ගං ඉවුරට නැඟී සිය තාලානුකූල සංඥා තනුව වාදනය කළ අතර, ඝන වැහි බිත්තිය විනිවිද යමින් රාජාට ඇමතුවා.',
            words: [
              { cleanWord: 'kasun', displayWord: 'Kasun' },
              { cleanWord: 'climbed', displayWord: 'climbed' },
              { cleanWord: 'onto', displayWord: 'onto' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'riverbank', displayWord: 'riverbank', vocab: { word: 'riverbank', phonetic: '/ˈrɪvəbæŋk/', sinhalaMeaning: 'ගං ඉවුර', englishDefinition: 'The bank of a river', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'played', displayWord: 'played' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'rhythmic', displayWord: 'rhythmic', vocab: { word: 'rhythmic', phonetic: '/ˈrɪðmɪk/', sinhalaMeaning: 'තාලානුකූල', englishDefinition: 'Having a regular repeating tempo', partOfSpeech: 'adjective' } },
              { cleanWord: 'signaling', displayWord: 'signaling', vocab: { word: 'signaling', phonetic: '/ˈsɪɡnəlɪŋ/', sinhalaMeaning: 'සංඥා කරමින්', englishDefinition: 'Giving information or an order by sign', partOfSpeech: 'verb' } },
              { cleanWord: 'melody', displayWord: 'melody,' },
              { cleanWord: 'calling', displayWord: 'calling' },
              { cleanWord: 'raja', displayWord: 'Raja' },
              { cleanWord: 'through', displayWord: 'through' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'thick', displayWord: 'thick' },
              { cleanWord: 'wall', displayWord: 'wall' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'rain', displayWord: 'rain.' }
            ]
          },
          {
            id: 'ef2-5',
            englishText: 'The noble giant waded courageously into the surging water, scooped the shivering fawn onto his broad neck, and brought it safely to dry land.',
            sinhalaTranslation: 'උතුම් යෝධයා වේගයෙන් ගලන ජලයට නිර්භීතව බැස, වෙව්ලන මුව පැටවාව සිය පුළුල් බෙල්ල මතට රැගෙන ආරක්ෂිතව වියළි බිමට ගෙනාවා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'noble', displayWord: 'noble', vocab: { word: 'noble', phonetic: '/ˈnəʊbl/', sinhalaMeaning: 'උතුම් / ශ්‍රේෂ්ඨ', englishDefinition: 'Having fine personal qualities or dignity', partOfSpeech: 'adjective' } },
              { cleanWord: 'giant', displayWord: 'giant' },
              { cleanWord: 'waded', displayWord: 'waded', vocab: { word: 'waded', phonetic: '/weɪdɪd/', sinhalaMeaning: 'වතුර මැදින් ඇවිද ගියා', englishDefinition: 'Walked with effort through water', partOfSpeech: 'verb' } },
              { cleanWord: 'courageously', displayWord: 'courageously', vocab: { word: 'courageously', phonetic: '/kəˈreɪdʒəsli/', sinhalaMeaning: 'නිර්භීතව / ධෛර්යයෙන් යුතුව', englishDefinition: 'In a brave manner', partOfSpeech: 'adverb' } },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'surging', displayWord: 'surging', vocab: { word: 'surging', phonetic: '/ˈsɜːdʒɪŋ/', sinhalaMeaning: 'පිටාර ගලන / වේගයෙන් නැඟී එන', englishDefinition: 'Moving powerfully upwards or forwards', partOfSpeech: 'adjective' } },
              { cleanWord: 'water', displayWord: 'water,' },
              { cleanWord: 'scooped', displayWord: 'scooped', vocab: { word: 'scooped', phonetic: '/skuːpt/', sinhalaMeaning: 'ප්‍රවේශමෙන් ඔසවා ගත්තා', englishDefinition: 'Picked up with a sweep', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'shivering', displayWord: 'shivering', vocab: { word: 'shivering', phonetic: '/ˈʃɪvərɪŋ/', sinhalaMeaning: 'සීතලෙන් වෙව්ලන', englishDefinition: 'Shaking slightly from cold or fright', partOfSpeech: 'adjective' } },
              { cleanWord: 'fawn', displayWord: 'fawn', vocab: { word: 'fawn', phonetic: '/fɔːn/', sinhalaMeaning: 'මුව පැටවා', englishDefinition: 'A young deer in its first year', partOfSpeech: 'noun' } },
              { cleanWord: 'onto', displayWord: 'onto' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'broad', displayWord: 'broad', vocab: { word: 'broad', phonetic: '/brɔːd/', sinhalaMeaning: 'පුළුල්', englishDefinition: 'Having an ample distance from side to side', partOfSpeech: 'adjective' } },
              { cleanWord: 'neck', displayWord: 'neck,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'brought', displayWord: 'brought' },
              { cleanWord: 'it', displayWord: 'it' },
              { cleanWord: 'safely', displayWord: 'safely' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'dry', displayWord: 'dry' },
              { cleanWord: 'land', displayWord: 'land.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'valley-robot',
    categoryId: 'scifi',
    categoryTitleEn: '3. Sci-Fi & Inventions',
    categoryTitleSi: 'විද්‍යා ප්‍රබන්ධ සහ නව නිපැයුම්',
    titleEn: 'Maya and the Robot of the Green Valley',
    titleSi: 'මායා සහ හරිත නිම්නයේ රොබෝ මිතුරා',
    level: 'Elementary (A2)',
    genreEn: 'Sci-Fi & Green Earth',
    genreSi: 'විද්‍යා ප්‍රබන්ධ සහ පරිසරය',
    estimatedMinutes: 6,
    coverAccent: '#0ea5e9',
    coverImage: mayaRobotCover,
    theme: 'scifi',
    quiz: [
      {
        id: 'vr-q1',
        questionEn: 'What was the little robot named Pip designed to do?',
        questionSi: 'පිප් නම් කුඩා රොබෝව නිර්මාණය කර තිබුණේ කුමන කාර්යය සඳහාද?',
        options: ['To plant wildflowers and measure soil health', 'To guard an underground silver mine', 'To fly airplanes across mountains'],
        optionsSi: ['වල් මල් සිටුවීමට සහ පසෙහි සාරවත් බව මැනීමට', 'භූගත රිදී පතලක් මුර කිරීමට', 'කඳුකරය හරහා ගුවන් යානා පියාසර කරවීමට'],
        correctIndex: 0,
        explanationSi: 'පිප් යනු පරිසරය සුවපත් කිරීම සඳහා බීජ සිටුවීමට සහ පස මැනීමට සාදන ලද උද්‍යාන පාලක රොබෝවෙකි.'
      },
      {
        id: 'vr-q2',
        questionEn: 'How did Maya help Pip when his solar battery ran out of energy?',
        questionSi: 'පිප්ගේ සූර්ය බැටරියේ බලය අවසන් වූ විට මායා ඔහුට උදව් කළේ කෙසේද?',
        options: ['She carried him to the sunny hilltop and polished his glass solar visor', 'She replaced his metal head with a new wooden box', 'She carried him back to the factory in town'],
        optionsSi: ['ඔහුව හිරු එළිය ඇති කඳු මුදුනට ඔසවාගෙන ගොස් සූර්ය පැනල පිරිසිදු කිරීමෙන්', 'ඔහුගේ ලෝහ හිස වෙනුවට ලී පෙට්ටියක් සවි කිරීමෙන්', 'ඔහුව නගරයේ කර්මාන්ත ශාලාව වෙත ආපසු ගෙන යාමෙන්'],
        correctIndex: 0,
        explanationSi: 'මායා පිප්ව අව්ව සහිත කඳු මුදුනට ගෙන ගොස් ඔහුගේ සූර්ය කාචය පිරිසිදු කර නැවත ආරෝපණය කළාය.'
      }
    ],
    chapters: [
      {
        id: 'vr-ch1',
        chapterNumber: 1,
        titleEn: 'The Rusting Discovery',
        titleSi: 'මලකඩ කෑ සොයාගැනීම',
        subtitleEn: 'An unexpected friend in the fern hollow',
        subtitleSi: 'පර්ණාංග පඳුරු අතරින් හමුවූ අනපේක්ෂිත මිතුරා',
        summaryEn: 'Maya explores an abandoned valley greenhouse and discovers Pip, a botanical robot with glowing blue optical eyes.',
        summarySi: 'අත්හැර දැමූ හරිතාගාරයක් ගවේෂණය කරන මායාට, නිල් පැහැයෙන් දිදුලන දෑස් ඇති පිප් නම් උද්භිද රොබෝව හමුවේ.',
        funFactEn: 'Modern robotic rovers on Mars use solar arrays and miniature spectrometers just like Pip to study mineral soil!',
        funFactSi: 'අඟහරු ග්‍රහයා ගවේෂණය කරන නවීන රෝවර් යානාද පස පරීක්ෂා කිරීම සඳහා පිප් මෙන් කුඩා සූර්ය පැනල සහ සංවේදක භාවිතා කරයි!',
        keyVocabulary: [
          { word: 'greenhouse', phonetic: '/ˈɡriːnhaʊs/', sinhalaMeaning: 'හරිතාගාරය', englishDefinition: 'A glass building in which plants are grown', partOfSpeech: 'noun' },
          { word: 'botanical', phonetic: '/bəˈtænɪkl/', sinhalaMeaning: 'උද්භිද විද්‍යාත්මක / ශාක පිළිබඳ', englishDefinition: 'Relating to plants or the study of flora', partOfSpeech: 'adjective' },
          { word: 'sensors', phonetic: '/ˈsensəz/', sinhalaMeaning: 'සංවේදක උපකරණ', englishDefinition: 'Devices that detect and respond to physical input', partOfSpeech: 'noun' },
          { word: 'optical', phonetic: '/ˈɒptɪkl/', sinhalaMeaning: 'දෘශ්‍ය / පෙනීම පිළිබඳ', englishDefinition: 'Relating to sight, lenses, or light', partOfSpeech: 'adjective' },
          { word: 'abandoned', phonetic: '/əˈbændənd/', sinhalaMeaning: 'අත්හැර දමන ලද', englishDefinition: 'Left completely and no longer used', partOfSpeech: 'adjective' },
          { word: 'whistled', phonetic: '/ˈwɪsld/', sinhalaMeaning: 'විසිල් නාදයක් නැඟුවා', englishDefinition: 'Emitted a clear high-pitched tone', partOfSpeech: 'verb' }
        ],
        sentences: [
          {
            id: 'vr1-1',
            englishText: 'Twelve-year-old Maya loved exploring the misty hills behind her grandmother’s terraced tea plantation.',
            sinhalaTranslation: 'දොළොස් හැවිරිදි මායා සිය මිත්තණියගේ තට්ටු තේ වගාව පිටුපස පිහිටි මීදුම් සහිත කඳුකරය ගවේෂණය කිරීමට මහත් සේ ප්‍රිය කළාය.',
            words: [
              { cleanWord: 'twelve-year-old', displayWord: 'Twelve-year-old' },
              { cleanWord: 'maya', displayWord: 'Maya' },
              { cleanWord: 'loved', displayWord: 'loved' },
              { cleanWord: 'exploring', displayWord: 'exploring', vocab: { word: 'exploring', phonetic: '/ɪkˈsplɔːrɪŋ/', sinhalaMeaning: 'ගවේෂණය කරමින්', englishDefinition: 'Traveling through an unfamiliar area to learn about it', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'misty', displayWord: 'misty' },
              { cleanWord: 'hills', displayWord: 'hills' },
              { cleanWord: 'behind', displayWord: 'behind' },
              { cleanWord: 'her', displayWord: 'her' },
              { cleanWord: 'grandmothers', displayWord: 'grandmother’s' },
              { cleanWord: 'terraced', displayWord: 'terraced', vocab: { word: 'terraced', phonetic: '/ˈterəst/', sinhalaMeaning: 'තට්ටු ආකාරයෙන් සාදන ලද', englishDefinition: 'Formed into flat stepped levels on a slope', partOfSpeech: 'adjective' } },
              { cleanWord: 'tea', displayWord: 'tea' },
              { cleanWord: 'plantation', displayWord: 'plantation.', vocab: { word: 'plantation', phonetic: '/plænˈteɪʃn/', sinhalaMeaning: 'වගා බිම / වතුයාය', englishDefinition: 'An estate on which crops are cultivated', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'vr1-2',
            englishText: 'Inside a glass dome covered in creeping wild jasmine, she heard a soft electronic beep.',
            sinhalaTranslation: 'වනගත පිච්ච වැල්වලින් වැසී තිබූ වීදුරු ගෝලාකාර කුටියක් තුළින්, මෘදු ඉලෙක්ට්‍රොනික බීප් හඬක් ඇයට ඇසුණා.',
            words: [
              { cleanWord: 'inside', displayWord: 'Inside' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'glass', displayWord: 'glass' },
              { cleanWord: 'dome', displayWord: 'dome,', vocab: { word: 'dome', phonetic: '/dəʊm/', sinhalaMeaning: 'ගෝලාකාර වහලය හෝ කුටිය', englishDefinition: 'A rounded vault forming the roof of a building', partOfSpeech: 'noun' } },
              { cleanWord: 'covered', displayWord: 'covered' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'creeping', displayWord: 'creeping', vocab: { word: 'creeping', phonetic: '/ˈkriːpɪŋ/', sinhalaMeaning: 'බඩගා යන / වැල් මෙන් පැතිරෙන', englishDefinition: 'Growing along the ground or clinging to walls', partOfSpeech: 'adjective' } },
              { cleanWord: 'wild', displayWord: 'wild' },
              { cleanWord: 'jasmine', displayWord: 'jasmine,', vocab: { word: 'jasmine', phonetic: '/ˈdʒæzmɪn/', sinhalaMeaning: 'පිච්ච මල්', englishDefinition: 'A fragrant white or yellow flower', partOfSpeech: 'noun' } },
              { cleanWord: 'she', displayWord: 'she' },
              { cleanWord: 'heard', displayWord: 'heard' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'soft', displayWord: 'soft' },
              { cleanWord: 'electronic', displayWord: 'electronic' },
              { cleanWord: 'beep', displayWord: 'beep.', vocab: { word: 'beep', phonetic: '/biːp/', sinhalaMeaning: 'බීප් නාදය', englishDefinition: 'A short high-pitched sound emitted by an electronic device', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'vr1-3',
            englishText: 'Curled beneath a mossy workbench was a round bronze robot the size of a watermelon.',
            sinhalaTranslation: 'පාසි බැඳුණු වැඩ මේසයක් යට ගුලි වී සිටියේ කොමඩු ගෙඩියක ප්‍රමාණයේ රවුම් ලෝකඩ රොබෝවරයෙකි.',
            words: [
              { cleanWord: 'curled', displayWord: 'Curled', vocab: { word: 'curled', phonetic: '/kɜːld/', sinhalaMeaning: 'ගුලි ගැසී සිටි', englishDefinition: 'Formed into a curved or coiled shape', partOfSpeech: 'verb' } },
              { cleanWord: 'beneath', displayWord: 'beneath', vocab: { word: 'beneath', phonetic: '/bɪˈniːθ/', sinhalaMeaning: 'යටින් / පහළින්', englishDefinition: 'Directly under something', partOfSpeech: 'preposition' } },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'mossy', displayWord: 'mossy' },
              { cleanWord: 'workbench', displayWord: 'workbench', vocab: { word: 'workbench', phonetic: '/ˈwɜːkbentʃ/', sinhalaMeaning: 'වැඩ මේසය', englishDefinition: 'A sturdy table used by mechanics or carpenters', partOfSpeech: 'noun' } },
              { cleanWord: 'was', displayWord: 'was' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'round', displayWord: 'round' },
              { cleanWord: 'bronze', displayWord: 'bronze' },
              { cleanWord: 'robot', displayWord: 'robot,' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'size', displayWord: 'size' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'watermelon', displayWord: 'watermelon.', vocab: { word: 'watermelon', phonetic: '/ˈwɔːtəmelən/', sinhalaMeaning: 'කොමඩු ගෙඩිය', englishDefinition: 'A large round fruit with sweet red pulp', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'vr1-4',
            englishText: 'When Maya carefully dusted off his glass eye, two cheerful azure lights blinked awake.',
            sinhalaTranslation: 'මායා ඔහුගේ වීදුරු ඇසේ දූවිලි ප්‍රවේශමෙන් පිසදැමූ විට, ප්‍රීතිමත් නිල් ආලෝක දෙකක් දැල්වී නිවී අවදි වුණා.',
            words: [
              { cleanWord: 'when', displayWord: 'When' },
              { cleanWord: 'maya', displayWord: 'Maya' },
              { cleanWord: 'carefully', displayWord: 'carefully' },
              { cleanWord: 'dusted', displayWord: 'dusted', vocab: { word: 'dusted', phonetic: '/ˈdʌstɪd/', sinhalaMeaning: 'දූවිලි පිසදැමුවා', englishDefinition: 'Cleaned dust away from a surface', partOfSpeech: 'verb' } },
              { cleanWord: 'off', displayWord: 'off' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'glass', displayWord: 'glass' },
              { cleanWord: 'eye', displayWord: 'eye,' },
              { cleanWord: 'two', displayWord: 'two' },
              { cleanWord: 'cheerful', displayWord: 'cheerful' },
              { cleanWord: 'azure', displayWord: 'azure', vocab: { word: 'azure', phonetic: '/ˈæʒə/', sinhalaMeaning: 'දීප්තිමත් නිල් පැහැය', englishDefinition: 'Bright blue color of a clear cloudless sky', partOfSpeech: 'adjective' } },
              { cleanWord: 'lights', displayWord: 'lights' },
              { cleanWord: 'blinked', displayWord: 'blinked', vocab: { word: 'blinked', phonetic: '/blɪŋkt/', sinhalaMeaning: 'දැල්වී නිවුණා', englishDefinition: 'Flashed light on and off rapidly', partOfSpeech: 'verb' } },
              { cleanWord: 'awake', displayWord: 'awake.' }
            ]
          },
          {
            id: 'vr1-5',
            englishText: '"Pip-pip!" the little machine chirped, extending a small three-fingered claw that held a dry sunflower seed.',
            sinhalaTranslation: '"පිප්-පිප්!" කුඩා යන්ත්‍රය නාද කරමින්, වියළි සූරියකාන්ත ඇටයක් අල්ලාගෙන සිටි සිය කුඩා ඇඟිලි තුනේ අඬුව දිගු කළා.',
            words: [
              { cleanWord: 'pip-pip', displayWord: '"Pip-pip!"' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'little', displayWord: 'little' },
              { cleanWord: 'machine', displayWord: 'machine' },
              { cleanWord: 'chirped', displayWord: 'chirped,' },
              { cleanWord: 'extending', displayWord: 'extending', vocab: { word: 'extending', phonetic: '/ɪkˈstendɪŋ/', sinhalaMeaning: 'ඉදිරියට දිගු කරමින්', englishDefinition: 'Holding out towards someone', partOfSpeech: 'verb' } },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'small', displayWord: 'small' },
              { cleanWord: 'three-fingered', displayWord: 'three-fingered' },
              { cleanWord: 'claw', displayWord: 'claw', vocab: { word: 'claw', phonetic: '/klɔː/', sinhalaMeaning: 'අඬුව / අල්ලනය', englishDefinition: 'Mechanical gripper or grasping tool', partOfSpeech: 'noun' } },
              { cleanWord: 'that', displayWord: 'that' },
              { cleanWord: 'held', displayWord: 'held' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'dry', displayWord: 'dry' },
              { cleanWord: 'sunflower', displayWord: 'sunflower' },
              { cleanWord: 'seed', displayWord: 'seed.' }
            ]
          }
        ]
      },
      {
        id: 'vr-ch2',
        chapterNumber: 2,
        titleEn: 'Planting the Tomorrow Garden',
        titleSi: 'හෙට දවසේ උයන වගා කිරීම',
        subtitleEn: 'Green leaves and recharged hearts',
        subtitleSi: 'හරිත පත්‍ර සහ නැවත ආරෝපණය වූ සිත',
        summaryEn: 'Maya and Pip replant the bare hillside with native blossoms, showing that technology and nature can thrive side by side.',
        summarySi: 'මායා සහ පිප් එක්ව නිම්නයේ මල් පැළ වගා කරමින්, තාක්ෂණය සහ පරිසරය සුහදව එක්විය හැකි බව පෙන්වයි.',
        funFactEn: 'Planting diverse native wildflowers attracts pollinator bees and increases local crop yields by over thirty percent!',
        funFactSi: 'දේශීය වන මල් වගා කිරීමෙන් මීමැස්සන් ආකර්ෂණය වී අවට ගොවිපළවල්වල අස්වැන්න සියයට තිහකින් වැඩි වේ!',
        keyVocabulary: [
          { word: 'recharged', phonetic: '/ˌriːˈtʃɑːdʒd/', sinhalaMeaning: 'නැවත බලය පිරවූ (බැටරි)', englishDefinition: 'Restored electrical energy to a battery', partOfSpeech: 'verb' },
          { word: 'seedlings', phonetic: '/ˈsiːdlɪŋz/', sinhalaMeaning: 'කුඩා පැළ', englishDefinition: 'Young plants raised from seed and not from a cutting', partOfSpeech: 'noun' },
          { word: 'thrive', phonetic: '/θraɪv/', sinhalaMeaning: 'සශ්‍රීකව වැඩෙනවා', englishDefinition: 'Grow or develop vigorously and healthily', partOfSpeech: 'verb' },
          { word: 'pollinators', phonetic: '/ˈpɒlɪneɪtəz/', sinhalaMeaning: 'පරාග වාහකයන් (මීමැස්සන් ආදී)', englishDefinition: 'Animals or insects that move pollen between flowers', partOfSpeech: 'noun' },
          { word: 'sprouted', phonetic: '/ˈspraʊtɪd/', sinhalaMeaning: 'අංකුර මතු කළා', englishDefinition: 'Produced new buds or shoots', partOfSpeech: 'verb' },
          { word: 'tended', phonetic: '/ˈtendɪd/', sinhalaMeaning: 'බලාගත්තා / සාත්තු කළා', englishDefinition: 'Cared for and looked after diligently', partOfSpeech: 'verb' }
        ],
        sentences: [
          {
            id: 'vr2-1',
            englishText: 'Together, Maya and Pip carried rich dark compost to the sunny slopes overlooking the valley.',
            sinhalaTranslation: 'මායා සහ පිප් එක්ව නිම්නය පෙනෙන අව්ව සහිත බෑවුම් වෙත සාරවත් කළු කොම්පෝස්ට් පස් රැගෙන ගියා.',
            words: [
              { cleanWord: 'together', displayWord: 'Together,' },
              { cleanWord: 'maya', displayWord: 'Maya' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'pip', displayWord: 'Pip' },
              { cleanWord: 'carried', displayWord: 'carried' },
              { cleanWord: 'rich', displayWord: 'rich' },
              { cleanWord: 'dark', displayWord: 'dark' },
              { cleanWord: 'compost', displayWord: 'compost', vocab: { word: 'compost', phonetic: '/ˈkɒmpɒst/', sinhalaMeaning: 'කොම්පෝස්ට් පොහොර', englishDefinition: 'Decayed organic material used as fertilizer', partOfSpeech: 'noun' } },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'sunny', displayWord: 'sunny' },
              { cleanWord: 'slopes', displayWord: 'slopes,', vocab: { word: 'slopes', phonetic: '/sləʊps/', sinhalaMeaning: 'කඳු බෑවුම්', englishDefinition: 'Surfaces of which one end is higher than the other', partOfSpeech: 'noun' } },
              { cleanWord: 'overlooking', displayWord: 'overlooking', vocab: { word: 'overlooking', phonetic: '/ˌəʊvəˈlʊkɪŋ/', sinhalaMeaning: 'ඉහළ සිට පහළ පෙනෙන', englishDefinition: 'Affording a view of from above', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'valley', displayWord: 'valley.' }
            ]
          },
          {
            id: 'vr2-2',
            englishText: 'With tiny spinning drill bits on his base, Pip dug perfect little holes for each seed and measured the moisture.',
            sinhalaTranslation: 'සිය පතුලේ ඇති කුඩා විදුම් කටු මඟින්, පිප් සෑම බීජයක් සඳහාම මනරම් කුඩා වළවල් හාරා තෙතමනය මැන බැලුවා.',
            words: [
              { cleanWord: 'with', displayWord: 'With' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'spinning', displayWord: 'spinning' },
              { cleanWord: 'drill', displayWord: 'drill' },
              { cleanWord: 'bits', displayWord: 'bits', vocab: { word: 'bits', phonetic: '/bɪts/', sinhalaMeaning: 'විදුම් කටු', englishDefinition: 'Cutting tools used in drills to create holes', partOfSpeech: 'noun' } },
              { cleanWord: 'on', displayWord: 'on' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'base', displayWord: 'base,' },
              { cleanWord: 'pip', displayWord: 'Pip' },
              { cleanWord: 'dug', displayWord: 'dug', vocab: { word: 'dug', phonetic: '/dʌɡ/', sinhalaMeaning: 'හැරුවා (dig හි අතීතය)', englishDefinition: 'Turned up earth with an implement', partOfSpeech: 'verb' } },
              { cleanWord: 'perfect', displayWord: 'perfect' },
              { cleanWord: 'little', displayWord: 'little' },
              { cleanWord: 'holes', displayWord: 'holes' },
              { cleanWord: 'for', displayWord: 'for' },
              { cleanWord: 'each', displayWord: 'each' },
              { cleanWord: 'seed', displayWord: 'seed' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'measured', displayWord: 'measured', vocab: { word: 'measured', phonetic: '/ˈmeʒəd/', sinhalaMeaning: 'මැන්නා', englishDefinition: 'Determined size, amount, or degree', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'moisture', displayWord: 'moisture.', vocab: { word: 'moisture', phonetic: '/ˈmɔɪstʃə/', sinhalaMeaning: 'තෙතමනය', englishDefinition: 'Water or other liquid diffused in a small quantity', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'vr2-3',
            englishText: 'Maya gently placed marigold, lavender, and sunflower seeds into the fertile soil.',
            sinhalaTranslation: 'මායා මාරිගෝල්ඩ්, ලැවෙන්ඩර් සහ සූරියකාන්ත බීජ සාරවත් පස තුළ ප්‍රවේශමෙන් තැන්පත් කළාය.',
            words: [
              { cleanWord: 'maya', displayWord: 'Maya' },
              { cleanWord: 'gently', displayWord: 'gently' },
              { cleanWord: 'placed', displayWord: 'placed' },
              { cleanWord: 'marigold', displayWord: 'marigold,', vocab: { word: 'marigold', phonetic: '/ˈmæriɡəʊld/', sinhalaMeaning: 'මාරිගෝල්ඩ් (දෑසමන්) මල්', englishDefinition: 'A plant of the daisy family with yellow or orange flowers', partOfSpeech: 'noun' } },
              { cleanWord: 'lavender', displayWord: 'lavender,', vocab: { word: 'lavender', phonetic: '/ˈlævəndə/', sinhalaMeaning: 'ලැවෙන්ඩර් මල්', englishDefinition: 'A small aromatic evergreen shrub of the mint family', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'sunflower', displayWord: 'sunflower' },
              { cleanWord: 'seeds', displayWord: 'seeds' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'fertile', displayWord: 'fertile', vocab: { word: 'fertile', phonetic: '/ˈfɜːtaɪl/', sinhalaMeaning: 'සාරවත් / පලදාව ඇති', englishDefinition: 'Producing abundant vegetation or crops', partOfSpeech: 'adjective' } },
              { cleanWord: 'soil', displayWord: 'soil.' }
            ]
          },
          {
            id: 'vr2-4',
            englishText: 'In just a few weeks, hundreds of bright yellow blossoms swayed in the cool mountain breeze.',
            sinhalaTranslation: 'සති කිහිපයක් ඇතුළත, සිය ගණනක් දීප්තිමත් කහ පැහැති මල් සිසිල් කඳුකර සුළඟේ නැටුවා.',
            words: [
              { cleanWord: 'in', displayWord: 'In' },
              { cleanWord: 'just', displayWord: 'just' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'few', displayWord: 'few' },
              { cleanWord: 'weeks', displayWord: 'weeks,' },
              { cleanWord: 'hundreds', displayWord: 'hundreds' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'bright', displayWord: 'bright' },
              { cleanWord: 'yellow', displayWord: 'yellow' },
              { cleanWord: 'blossoms', displayWord: 'blossoms', vocab: { word: 'blossoms', phonetic: '/ˈblɒsəmz/', sinhalaMeaning: 'මල් / මල් පිපීම', englishDefinition: 'Flowers or a mass of flowers on a tree or bush', partOfSpeech: 'noun' } },
              { cleanWord: 'swayed', displayWord: 'swayed', vocab: { word: 'swayed', phonetic: '/sweɪd/', sinhalaMeaning: 'පැද්දුණා / සෙලවුණා', englishDefinition: 'Moved slowly from side to side', partOfSpeech: 'verb' } },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'cool', displayWord: 'cool' },
              { cleanWord: 'mountain', displayWord: 'mountain' },
              { cleanWord: 'breeze', displayWord: 'breeze.', vocab: { word: 'breeze', phonetic: '/briːz/', sinhalaMeaning: 'මෘදු සිහිල් සුළඟ', englishDefinition: 'A gentle wind', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'vr2-5',
            englishText: 'Wild honeybees returned to the valley, and Pip danced happily in circles under the golden afternoon sun.',
            sinhalaTranslation: 'වනගත මීමැස්සන් නැවතත් නිම්නය වෙත පැමිණි අතර, රන්වන් හවස හිරු එළිය යට පිප් සතුටින් රවුමට නැටුවා.',
            words: [
              { cleanWord: 'wild', displayWord: 'Wild' },
              { cleanWord: 'honeybees', displayWord: 'honeybees', vocab: { word: 'honeybees', phonetic: '/ˈhʌnibiːz/', sinhalaMeaning: 'මීමැස්සන්', englishDefinition: 'Bees that produce honey and pollinate flora', partOfSpeech: 'noun' } },
              { cleanWord: 'returned', displayWord: 'returned' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'valley', displayWord: 'valley,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'pip', displayWord: 'Pip' },
              { cleanWord: 'danced', displayWord: 'danced' },
              { cleanWord: 'happily', displayWord: 'happily' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'circles', displayWord: 'circles' },
              { cleanWord: 'under', displayWord: 'under' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'golden', displayWord: 'golden' },
              { cleanWord: 'afternoon', displayWord: 'afternoon' },
              { cleanWord: 'sun', displayWord: 'sun.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'bakers-bread',
    categoryId: 'kindness',
    categoryTitleEn: '4. Kindness & Community',
    categoryTitleSi: 'දයාව සහ මිත්‍රත්වය',
    titleEn: 'The Baker’s Magic Cinnamon Loaf',
    titleSi: 'බේකරි කරුවාගේ මායා කුරුඳු පාන්',
    level: 'Beginner (A1)',
    genreEn: 'Kindness & Community',
    genreSi: 'කරුණාව සහ මිත්‍රත්වය',
    estimatedMinutes: 5,
    coverAccent: '#b45309',
    coverImage: cinnamonLoafCover,
    theme: 'community',
    quiz: [
      {
        id: 'bb-q1',
        questionEn: 'What special secret ingredient made Mr. Toby’s bread so fragrant?',
        questionSi: 'මිස්ටර් ටෝබිගේ පාන් මෙතරම් සුවඳවත් කළ විශේෂ රහස් අමුද්‍රව්‍යය කුමක්ද?',
        options: ['Sweet golden honey and aromatic cinnamon bark', 'Salt water from the ocean', 'Bitter green tea leaves'],
        optionsSi: ['මිහිරි රන්වන් මී පැණි සහ සුවඳැති කුරුඳු පොතු', 'සාගරයෙන් ගත් ලුණු වතුර', 'තිත්ත කොළ තේ කොළ'],
        correctIndex: 0,
        explanationSi: 'ටෝබිගේ පාන්වල සුවඳට හේතුව වූයේ මිහිරි මී පැණි සහ නැවුම් කුරුඳු (honey and cinnamon) ය.'
      },
      {
        id: 'bb-q2',
        questionEn: 'Why did the cold, tired traveler smile outside the bakery?',
        questionSi: 'බේකරිය ඉදිරිපිට සිටි සීතලෙන් වෙහෙසට පත් මගියා සිනහසුණේ ඇයි?',
        options: ['Mr. Toby shared a warm, freshly baked loaf without asking for money', 'The traveler found a bag of silver coins on the street', 'A carriage offered him a ride to the castle'],
        optionsSi: ['මිස්ටර් ටෝබි කිසිදු මුදලක් නොගෙන උණුසුම් නැවුම් පාන් ගෙඩියක් ඔහුට ලබාදුන් නිසා', 'මගියාට මඟදී රිදී කාසි මල්ලක් හමුවූ නිසා', 'අශ්ව කරත්තයක් ඔහුට නවාතැනක් ලබාදුන් නිසා'],
        correctIndex: 0,
        explanationSi: 'ටෝබි නොමිලේ උණුසුම් නැවුම් පාන් ගෙඩියක් කරුණාවෙන් ලබාදුන් විට මගියා සතුටට පත් විය.'
      }
    ],
    chapters: [
      {
        id: 'bb-ch1',
        chapterNumber: 1,
        titleEn: 'The Dawn Oven of Riverwood',
        titleSi: 'රිවර්වුඩ් නගරයේ උදෑසන උදුන',
        subtitleEn: 'Flour, warmth, and the morning aroma',
        subtitleSi: 'පිටි, උණුසුම සහ උදෑසන සුවඳ',
        summaryEn: 'Old Mr. Toby begins baking bread while the village is still asleep under blankets of winter frost.',
        summarySi: 'ශීත හිම පතනය යට ගම්මානය නිදා සිටියදී, වයෝවෘද්ධ ටෝබි පාන් පුළුස්සන්නට පටන් ගනී.',
        funFactEn: 'Yeast is a tiny living microscopic fungus that eats natural sugars in flour and creates air bubbles to make dough rise!',
        funFactSi: 'යීස්ට් (Yeast) යනු පිටිවල ඇති සීනි ආහාරයට ගෙන වායු බුබුළු සාදමින් පිටි පිපිරවීමට උපකාර කරන ක්ෂුද්‍රජීවී දිලීරයකි!',
        keyVocabulary: [
          { word: 'bakery', phonetic: '/ˈbeɪkəri/', sinhalaMeaning: 'බේකරිය', englishDefinition: 'A workplace where bread and cakes are baked', partOfSpeech: 'noun' },
          { word: 'dough', phonetic: '/dəʊ/', sinhalaMeaning: 'අනාගත් පිටි ගුලිය', englishDefinition: 'A thick mixture of flour and liquid for baking', partOfSpeech: 'noun' },
          { word: 'cinnamon', phonetic: '/ˈsɪnəmən/', sinhalaMeaning: 'කුරුඳු', englishDefinition: 'An aromatic spice made from the dried bark of an Asian tree', partOfSpeech: 'noun' },
          { word: 'frost', phonetic: '/frɒst/', sinhalaMeaning: 'තුෂාර / හිම කැට', englishDefinition: 'A deposit of small white ice crystals formed on ground', partOfSpeech: 'noun' },
          { word: 'kneaded', phonetic: '/ˈniːdɪd/', sinhalaMeaning: 'අතින් අනා මෘදු කළා', englishDefinition: 'Worked moist flour into dough by hand', partOfSpeech: 'verb' },
          { word: 'aroma', phonetic: '/əˈrəʊmə/', sinhalaMeaning: 'සුවඳ / සුවඳවත් වාතය', englishDefinition: 'A distinctive, typically pleasant smell', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'bb1-1',
            englishText: 'Long before the rooster crowed, warm yellow lantern light spilled from the windows of Toby’s Corner Bakery.',
            sinhalaTranslation: 'කුකුළා හඬලන්නට බොහෝ වේලාවකට පෙර, ටෝබිගේ කොනක පිහිටි බේකරියේ ජනේලවලින් උණුසුම් කහ පැහැති පහන් එළිය ගලා ආවා.',
            words: [
              { cleanWord: 'long', displayWord: 'Long' },
              { cleanWord: 'before', displayWord: 'before' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'rooster', displayWord: 'rooster', vocab: { word: 'rooster', phonetic: '/ˈruːstə/', sinhalaMeaning: 'කුකුළා', englishDefinition: 'A male domestic fowl', partOfSpeech: 'noun' } },
              { cleanWord: 'crowed', displayWord: 'crowed,', vocab: { word: 'crowed', phonetic: '/krəʊd/', sinhalaMeaning: 'හඬලෑවා', englishDefinition: 'Uttered the characteristic loud cry of a rooster', partOfSpeech: 'verb' } },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'yellow', displayWord: 'yellow' },
              { cleanWord: 'lantern', displayWord: 'lantern' },
              { cleanWord: 'light', displayWord: 'light' },
              { cleanWord: 'spilled', displayWord: 'spilled' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'windows', displayWord: 'windows' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'tobys', displayWord: 'Toby’s' },
              { cleanWord: 'corner', displayWord: 'Corner' },
              { cleanWord: 'bakery', displayWord: 'Bakery.', vocab: { word: 'bakery', phonetic: '/ˈbeɪkəri/', sinhalaMeaning: 'බේකරිය', englishDefinition: 'Place where bread and pastries are made', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'bb1-2',
            englishText: 'Mr. Toby wore a snowy white apron and hummed cheerful tunes as he sifted golden wheat flour.',
            sinhalaTranslation: 'මිස්ටර් ටෝබි හිම වැනි සුදු ඇප්‍රොනයක් හැඳ, රන්වන් තිරිඟු පිටි හලමින් ප්‍රීතිමත් තනු මුමුණමින් සිටියා.',
            words: [
              { cleanWord: 'mr', displayWord: 'Mr.' },
              { cleanWord: 'toby', displayWord: 'Toby' },
              { cleanWord: 'wore', displayWord: 'wore' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'snowy', displayWord: 'snowy' },
              { cleanWord: 'white', displayWord: 'white' },
              { cleanWord: 'apron', displayWord: 'apron', vocab: { word: 'apron', phonetic: '/ˈeɪprən/', sinhalaMeaning: 'ඇඳුමට උඩින් අඳින ඇප්‍රොන් එක', englishDefinition: 'A garment worn over clothes to protect them while cooking', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'hummed', displayWord: 'hummed', vocab: { word: 'hummed', phonetic: '/hʌmd/', sinhalaMeaning: 'මුමුණා ගී ගැයුවා', englishDefinition: 'Made a low, steady continuous musical sound with lips closed', partOfSpeech: 'verb' } },
              { cleanWord: 'cheerful', displayWord: 'cheerful' },
              { cleanWord: 'tunes', displayWord: 'tunes' },
              { cleanWord: 'as', displayWord: 'as' },
              { cleanWord: 'he', displayWord: 'he' },
              { cleanWord: 'sifted', displayWord: 'sifted', vocab: { word: 'sifted', phonetic: '/ˈsɪftɪd/', sinhalaMeaning: 'පිටි හලනු ලැබුවා', englishDefinition: 'Put fine powdery substance through a sieve', partOfSpeech: 'verb' } },
              { cleanWord: 'golden', displayWord: 'golden' },
              { cleanWord: 'wheat', displayWord: 'wheat', vocab: { word: 'wheat', phonetic: '/wiːt/', sinhalaMeaning: 'තිරිඟු', englishDefinition: 'A cereal plant yielding grain used for flour', partOfSpeech: 'noun' } },
              { cleanWord: 'flour', displayWord: 'flour.', vocab: { word: 'flour', phonetic: '/flaʊə/', sinhalaMeaning: 'පිටි', englishDefinition: 'Powder made by grinding raw grains', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'bb1-3',
            englishText: 'He added warm milk, wildflower honey, and two spoonfuls of fragrant sweet cinnamon powder.',
            sinhalaTranslation: 'ඔහු උණුසුම් කිරි, වන මල් මී පැණි සහ සුවඳැති මිහිරි කුරුඳු කුඩු හැඳි දෙකක් එයට එක් කළා.',
            words: [
              { cleanWord: 'he', displayWord: 'He' },
              { cleanWord: 'added', displayWord: 'added' },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'milk', displayWord: 'milk,' },
              { cleanWord: 'wildflower', displayWord: 'wildflower' },
              { cleanWord: 'honey', displayWord: 'honey,', vocab: { word: 'honey', phonetic: '/ˈhʌni/', sinhalaMeaning: 'මී පැණි', englishDefinition: 'A sweet yellow fluid made by bees from nectar', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'two', displayWord: 'two' },
              { cleanWord: 'spoonfuls', displayWord: 'spoonfuls', vocab: { word: 'spoonfuls', phonetic: '/ˈspuːnfʊlz/', sinhalaMeaning: 'හැඳි ප්‍රමාණයන්', englishDefinition: 'The amount that a spoon can hold', partOfSpeech: 'noun' } },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'fragrant', displayWord: 'fragrant', vocab: { word: 'fragrant', phonetic: '/ˈfreɪɡrənt/', sinhalaMeaning: 'සුවඳවත් / මිහිරි සුවඳ ඇති', englishDefinition: 'Having a pleasant smell', partOfSpeech: 'adjective' } },
              { cleanWord: 'sweet', displayWord: 'sweet' },
              { cleanWord: 'cinnamon', displayWord: 'cinnamon', vocab: { word: 'cinnamon', phonetic: '/ˈsɪnəmən/', sinhalaMeaning: 'කුරුඳු', englishDefinition: 'Aromatic spice', partOfSpeech: 'noun' } },
              { cleanWord: 'powder', displayWord: 'powder.' }
            ]
          },
          {
            id: 'bb1-4',
            englishText: 'His strong hands kneaded the dough until it was soft and smooth like a silk cushion.',
            sinhalaTranslation: 'ඔහුගේ ශක්තිමත් දෑත් පිටි ගුලිය සේද කොට්ටයක් මෙන් මෘදු හා සිනිඳු වන තෙක් හොඳින් අනා පදම් කළා.',
            words: [
              { cleanWord: 'his', displayWord: 'His' },
              { cleanWord: 'strong', displayWord: 'strong' },
              { cleanWord: 'hands', displayWord: 'hands' },
              { cleanWord: 'kneaded', displayWord: 'kneaded', vocab: { word: 'kneaded', phonetic: '/ˈniːdɪd/', sinhalaMeaning: 'අතින් අනා පදම් කළා', englishDefinition: 'Worked dough with hands to make smooth', partOfSpeech: 'verb' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'dough', displayWord: 'dough', vocab: { word: 'dough', phonetic: '/dəʊ/', sinhalaMeaning: 'අනාගත් පිටි ගුලිය', englishDefinition: 'Thick paste of flour and water for bread', partOfSpeech: 'noun' } },
              { cleanWord: 'until', displayWord: 'until' },
              { cleanWord: 'it', displayWord: 'it' },
              { cleanWord: 'was', displayWord: 'was' },
              { cleanWord: 'soft', displayWord: 'soft' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'smooth', displayWord: 'smooth' },
              { cleanWord: 'like', displayWord: 'like' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'silk', displayWord: 'silk' },
              { cleanWord: 'cushion', displayWord: 'cushion.', vocab: { word: 'cushion', phonetic: '/ˈkʊʃn/', sinhalaMeaning: 'කොට්ටය', englishDefinition: 'A soft bag of cloth stuffed with feather or foam', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'bb1-5',
            englishText: 'When he slipped the braided loaves into the fiery stone oven, an irresistible perfume wafted into the frosty street.',
            sinhalaTranslation: 'ගෙතූ පාන් ගෙඩි ගිනිමය ගල් උදුන තුළට ඇතුළු කළ විට, නොඉවසිය හැකි තරම් මිහිරි සුවඳක් සීතල වීදිය පුරා පැතිර ගියා.',
            words: [
              { cleanWord: 'when', displayWord: 'When' },
              { cleanWord: 'he', displayWord: 'he' },
              { cleanWord: 'slipped', displayWord: 'slipped' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'braided', displayWord: 'braided', vocab: { word: 'braided', phonetic: '/ˈbreɪdɪd/', sinhalaMeaning: 'ගෙතුමක් ලෙස සැකසූ', englishDefinition: 'Intertwined in a decorative braid', partOfSpeech: 'adjective' } },
              { cleanWord: 'loaves', displayWord: 'loaves', vocab: { word: 'loaves', phonetic: '/ləʊvz/', sinhalaMeaning: 'පාන් ගෙඩි (loaf හි බහුවචනය)', englishDefinition: 'Plural of loaf; shaped masses of baked bread', partOfSpeech: 'noun' } },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'fiery', displayWord: 'fiery', vocab: { word: 'fiery', phonetic: '/ˈfaɪəri/', sinhalaMeaning: 'ගිනිමය / රස්නය ඇති', englishDefinition: 'Consisting of fire or burning intensely', partOfSpeech: 'adjective' } },
              { cleanWord: 'stone', displayWord: 'stone' },
              { cleanWord: 'oven', displayWord: 'oven,', vocab: { word: 'oven', phonetic: '/ˈʌvn/', sinhalaMeaning: 'උදුන', englishDefinition: 'Enclosed compartment for baking', partOfSpeech: 'noun' } },
              { cleanWord: 'an', displayWord: 'an' },
              { cleanWord: 'irresistible', displayWord: 'irresistible', vocab: { word: 'irresistible', phonetic: '/ˌɪrɪˈzɪstəbl/', sinhalaMeaning: 'ප්‍රතික්ෂේප කළ නොහැකි තරම් ආකර්ෂණීය', englishDefinition: 'Too attractive and tempting to resist', partOfSpeech: 'adjective' } },
              { cleanWord: 'perfume', displayWord: 'perfume', vocab: { word: 'perfume', phonetic: '/ˈpɜːfjuːm/', sinhalaMeaning: 'සුවඳ', englishDefinition: 'A fragrant sweet scent', partOfSpeech: 'noun' } },
              { cleanWord: 'wafted', displayWord: 'wafted', vocab: { word: 'wafted', phonetic: '/ˈwɒftɪd/', sinhalaMeaning: 'සුළඟේ පාවී ගියා', englishDefinition: 'Passed easily or gently through air', partOfSpeech: 'verb' } },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'frosty', displayWord: 'frosty' },
              { cleanWord: 'street', displayWord: 'street.' }
            ]
          }
        ]
      },
      {
        id: 'bb-ch2',
        chapterNumber: 2,
        titleEn: 'The Loaf that Warmed a Heart',
        titleSi: 'හදවතක් උණුසුම් කළ පාන් ගෙඩිය',
        subtitleEn: 'The true sweetness of sharing',
        subtitleSi: 'බෙදාහදා ගැනීමේ සැබෑ මිහිර',
        summaryEn: 'A shivering traveler stops outside the bakery window, and Mr. Toby offers more than just warm food.',
        summarySi: 'සීතලෙන් වෙව්ලන මගියෙකු බේකරිය ඉදිරිපිට නතර වන අතර, මිස්ටර් ටෝබි ඔහුට උණුසුම් ආහාර පමණක් නොව කරුණාවද පිරිනමයි.',
        funFactEn: 'Breaking bread together is one of the oldest human customs symbolizing peace and friendship across every culture!',
        funFactSi: 'එක්ව පාන් බෙදාහදා ගැනීම යනු සියලු සංස්කෘතීන් තුළ සාමය සහ මිත්‍රත්වය සංකේතවත් කරන පැරණිතම මානව චාරිත්‍රයකි!',
        keyVocabulary: [
          { word: 'traveler', phonetic: '/ˈtrævələ/', sinhalaMeaning: 'මගියා / සංචාරකයා', englishDefinition: 'A person who is travelling or visiting somewhere', partOfSpeech: 'noun' },
          { word: 'generous', phonetic: '/ˈdʒenərəs/', sinhalaMeaning: 'ත්‍යාගශීලී / නොමසුරු', englishDefinition: 'Giving more of something than is strictly necessary', partOfSpeech: 'adjective' },
          { word: 'crust', phonetic: '/krʌst/', sinhalaMeaning: 'පාන් කබොල / පිටත තට්ටුව', englishDefinition: 'The tough outer part of a loaf of bread', partOfSpeech: 'noun' },
          { word: 'grateful', phonetic: '/ˈɡreɪtfl/', sinhalaMeaning: 'කෘතඥ වූ / ස්තුතිවන්ත', englishDefinition: 'Feeling or showing an appreciation of kindness', partOfSpeech: 'adjective' },
          { word: 'steaming', phonetic: '/ˈstiːmɪŋ/', sinhalaMeaning: 'දුම් දමන', englishDefinition: 'Giving off steam from heat', partOfSpeech: 'adjective' },
          { word: 'kindness', phonetic: '/ˈkaɪndnəs/', sinhalaMeaning: 'කරුණාව / කරුණාවන්තකම', englishDefinition: 'The quality of being friendly, generous, and considerate', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'bb2-1',
            englishText: 'Looking through the fogged shop window, Mr. Toby noticed an elderly traveler wrapped in a thin patched coat.',
            sinhalaTranslation: 'මීදුමෙන් වැසුණු කඩේ ජනේලය තුළින් බලද්දී, පැලැස්තර දැමූ සිහින් කබායක් හැඳගත් වයෝවෘද්ධ මගියෙකු මිස්ටර් ටෝබිට දක්නට ලැබුණා.',
            words: [
              { cleanWord: 'looking', displayWord: 'Looking' },
              { cleanWord: 'through', displayWord: 'through' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'fogged', displayWord: 'fogged' },
              { cleanWord: 'shop', displayWord: 'shop' },
              { cleanWord: 'window', displayWord: 'window,' },
              { cleanWord: 'mr', displayWord: 'Mr.' },
              { cleanWord: 'toby', displayWord: 'Toby' },
              { cleanWord: 'noticed', displayWord: 'noticed' },
              { cleanWord: 'an', displayWord: 'an' },
              { cleanWord: 'elderly', displayWord: 'elderly', vocab: { word: 'elderly', phonetic: '/ˈeldəli/', sinhalaMeaning: 'වයෝවෘද්ධ / මහලු', englishDefinition: 'Old or aging person', partOfSpeech: 'adjective' } },
              { cleanWord: 'traveler', displayWord: 'traveler', vocab: { word: 'traveler', phonetic: '/ˈtrævələ/', sinhalaMeaning: 'මගියා', englishDefinition: 'A person on a journey', partOfSpeech: 'noun' } },
              { cleanWord: 'wrapped', displayWord: 'wrapped' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'thin', displayWord: 'thin' },
              { cleanWord: 'patched', displayWord: 'patched', vocab: { word: 'patched', phonetic: '/pætʃt/', sinhalaMeaning: 'පැලැස්තර දැමූ', englishDefinition: 'Mended with pieces of cloth', partOfSpeech: 'adjective' } },
              { cleanWord: 'coat', displayWord: 'coat.' }
            ]
          },
          {
            id: 'bb2-2',
            englishText: 'The traveler rubbed his shivering hands together and looked longingly at the golden loaves cooling on the wooden rack.',
            sinhalaTranslation: 'මගියා සිය සීතලෙන් වෙව්ලන දෑත් එකිනෙක අතුල්ලමින්, ලී රාක්කයේ නිවෙමින් තිබූ රන්වන් පාන් ගෙඩි දෙස ආශාවෙන් බැලුවා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'traveler', displayWord: 'traveler' },
              { cleanWord: 'rubbed', displayWord: 'rubbed', vocab: { word: 'rubbed', phonetic: '/rʌbd/', sinhalaMeaning: 'අතුල්ලනු ලැබුවා', englishDefinition: 'Applied firm friction with hands', partOfSpeech: 'verb' } },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'shivering', displayWord: 'shivering' },
              { cleanWord: 'hands', displayWord: 'hands' },
              { cleanWord: 'together', displayWord: 'together' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'looked', displayWord: 'looked' },
              { cleanWord: 'longingly', displayWord: 'longingly', vocab: { word: 'longingly', phonetic: '/ˈlɒŋɪŋli/', sinhalaMeaning: 'දැඩි ආශාවෙන්', englishDefinition: 'With a yearning desire', partOfSpeech: 'adverb' } },
              { cleanWord: 'at', displayWord: 'at' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'golden', displayWord: 'golden' },
              { cleanWord: 'loaves', displayWord: 'loaves' },
              { cleanWord: 'cooling', displayWord: 'cooling' },
              { cleanWord: 'on', displayWord: 'on' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'wooden', displayWord: 'wooden' },
              { cleanWord: 'rack', displayWord: 'rack.', vocab: { word: 'rack', phonetic: '/ræk/', sinhalaMeaning: 'රාක්කය', englishDefinition: 'A framework for holding or displaying objects', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'bb2-3',
            englishText: 'Without a moment’s hesitation, Mr. Toby wrapped the largest steaming cinnamon loaf in clean brown paper.',
            sinhalaTranslation: 'කිසිදු පැකිලීමකින් තොරව, මිස්ටර් ටෝබි දුම් දමන විශාලතම කුරුඳු පාන් ගෙඩිය පිරිසිදු දුඹුරු කඩදාසියක එතුවා.',
            words: [
              { cleanWord: 'without', displayWord: 'Without' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'moments', displayWord: 'moment’s' },
              { cleanWord: 'hesitation', displayWord: 'hesitation,', vocab: { word: 'hesitation', phonetic: '/ˌhezɪˈteɪʃn/', sinhalaMeaning: 'පැකිලීම', englishDefinition: 'The action of pausing before saying or doing something', partOfSpeech: 'noun' } },
              { cleanWord: 'mr', displayWord: 'Mr.' },
              { cleanWord: 'toby', displayWord: 'Toby' },
              { cleanWord: 'wrapped', displayWord: 'wrapped' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'largest', displayWord: 'largest' },
              { cleanWord: 'steaming', displayWord: 'steaming', vocab: { word: 'steaming', phonetic: '/ˈstiːmɪŋ/', sinhalaMeaning: 'දුම් දමන / රස්නය ඇති', englishDefinition: 'Emitting visible steam', partOfSpeech: 'adjective' } },
              { cleanWord: 'cinnamon', displayWord: 'cinnamon' },
              { cleanWord: 'loaf', displayWord: 'loaf' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'clean', displayWord: 'clean' },
              { cleanWord: 'brown', displayWord: 'brown' },
              { cleanWord: 'paper', displayWord: 'paper.' }
            ]
          },
          {
            id: 'bb2-4',
            englishText: 'He opened the door, handed the bread to the stranger, and said, "A warm breakfast belongs to anyone who journeys in winter."',
            sinhalaTranslation: 'ඔහු දොර විවෘත කර, ආගන්තුකයා අතට පාන් ගෙඩිය දෙමින්, "ශීත ඍතුවේ ගමන් කරන ඕනෑම කෙනෙකුට උණුසුම් උදෑසන ආහාරයක් හිමි විය යුතුයි," යැයි කීවා.',
            words: [
              { cleanWord: 'he', displayWord: 'He' },
              { cleanWord: 'opened', displayWord: 'opened' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'door', displayWord: 'door,' },
              { cleanWord: 'handed', displayWord: 'handed' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'bread', displayWord: 'bread' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'stranger', displayWord: 'stranger,', vocab: { word: 'stranger', phonetic: '/ˈstreɪndʒə/', sinhalaMeaning: 'ආගන්තුකයා / නුපුරුදු පුද්ගලයා', englishDefinition: 'A person whom one does not know', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'said', displayWord: 'said,' },
              { cleanWord: 'a', displayWord: '"A' },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'breakfast', displayWord: 'breakfast', vocab: { word: 'breakfast', phonetic: '/ˈbrekfəst/', sinhalaMeaning: 'උදෑසන ආහාරය', englishDefinition: 'The first meal of the day', partOfSpeech: 'noun' } },
              { cleanWord: 'belongs', displayWord: 'belongs', vocab: { word: 'belongs', phonetic: '/bɪˈlɒŋz/', sinhalaMeaning: 'අයිති වේ', englishDefinition: 'Is fitting, suitable, or rightful property', partOfSpeech: 'verb' } },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'anyone', displayWord: 'anyone' },
              { cleanWord: 'who', displayWord: 'who' },
              { cleanWord: 'journeys', displayWord: 'journeys', vocab: { word: 'journeys', phonetic: '/ˈdʒɜːniz/', sinhalaMeaning: 'ගමන් කරනවා', englishDefinition: 'Travels from one place to another', partOfSpeech: 'verb' } },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'winter', displayWord: 'winter."' }
            ]
          },
          {
            id: 'bb2-5',
            englishText: 'Tears of gratitude welled in the traveler’s eyes as the delicious warmth spread through his frozen fingertips.',
            sinhalaTranslation: 'ප්‍රණීත උණුසුම සිය මිදුණු ඇඟිලි තුඩු හරහා පැතිර යද්දී, මගියාගේ දෙනෙත කෘතඥතාවයේ කඳුළින් පිරී ගියා.',
            words: [
              { cleanWord: 'tears', displayWord: 'Tears' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'gratitude', displayWord: 'gratitude' },
              { cleanWord: 'welled', displayWord: 'welled', vocab: { word: 'welled', phonetic: '/weld/', sinhalaMeaning: 'පිරී ඉතිරී ආවා', englishDefinition: 'Rose to surface and overflowed like water', partOfSpeech: 'verb' } },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'travelers', displayWord: 'traveler’s' },
              { cleanWord: 'eyes', displayWord: 'eyes' },
              { cleanWord: 'as', displayWord: 'as' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'delicious', displayWord: 'delicious', vocab: { word: 'delicious', phonetic: '/dɪˈlɪʃəs/', sinhalaMeaning: 'ඉතා ප්‍රණීත / රසවත්', englishDefinition: 'Highly pleasing to the taste', partOfSpeech: 'adjective' } },
              { cleanWord: 'warmth', displayWord: 'warmth', vocab: { word: 'warmth', phonetic: '/wɔːmθ/', sinhalaMeaning: 'උණුසුම', englishDefinition: 'Comforting heat', partOfSpeech: 'noun' } },
              { cleanWord: 'spread', displayWord: 'spread' },
              { cleanWord: 'through', displayWord: 'through' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'frozen', displayWord: 'frozen', vocab: { word: 'frozen', phonetic: '/ˈfrəʊzn/', sinhalaMeaning: 'මිදුණු / අධික සීතල', englishDefinition: 'Turned into ice or numb with extreme cold', partOfSpeech: 'adjective' } },
              { cleanWord: 'fingertips', displayWord: 'fingertips.', vocab: { word: 'fingertips', phonetic: '/ˈfɪŋɡətɪps/', sinhalaMeaning: 'ඇඟිලි තුඩු', englishDefinition: 'The ends of fingers', partOfSpeech: 'noun' } }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'cloud-kite',
    categoryId: 'mystery',
    categoryTitleEn: '1. Mystery & Adventure',
    categoryTitleSi: 'අබිරහස් සහ වික්‍රමාන්විත',
    titleEn: 'The Boy Who Built a Kite to the Clouds',
    titleSi: 'වලාකුළු කරා සරුංගලයක් හැදූ පිරිමි ළමයා',
    level: 'Intermediate (B1)',
    genreEn: 'Perseverance & Wonder',
    genreSi: 'අධිෂ්ඨානය සහ විස්මය',
    estimatedMinutes: 6,
    coverAccent: '#6366f1',
    coverImage: cloudKiteCover,
    theme: 'adventure',
    quiz: [
      {
        id: 'ck-q1',
        questionEn: 'What materials did Devon use to make his grand kite lightweight yet sturdy?',
        questionSi: 'සිය විශාල සරුංගලය සැහැල්ලු මෙන්ම ශක්තිමත් කිරීමට ඩෙවොන් භාවිතා කළ ද්‍රව්‍ය මොනවාද?',
        options: ['Split bamboo splints and recycled crimson kite silk', 'Heavy iron rods and cardboard sheets', 'Plastic shopping bags and cotton yarn'],
        optionsSi: ['පැළුණු උණ බට තීර සහ ප්‍රතිචක්‍රීකරණය කළ රතු පැහැති සේද රෙදි', 'බරැති යකඩ කූරු සහ කාඩ්බෝඩ් තහඩු', 'ප්ලාස්ටික් ෂොපින් බෑග් සහ කපු නූල්'],
        correctIndex: 0,
        explanationSi: 'ඩෙවොන් නම්‍යශීලී උණ බට (split bamboo) සහ සැහැල්ලු සේද රෙදි (crimson silk) යොදාගත්තේය.'
      },
      {
        id: 'ck-q2',
        questionEn: 'What special item did Devon tie to the kite string to send a message into the sky?',
        questionSi: 'අහසට පණිවිඩයක් යැවීම සඳහා සරුංගල් නූලේ ඩෙවොන් ගැටගැසුවේ කුමක්ද?',
        options: ['A brass chime and a parchment wish for clean rains', 'A heavy metal key', 'A glass bottle with salt'],
        optionsSi: ['කුඩා පිත්තල සීනුවක් සහ පිරිසිදු වැසි ඉල්ලා ලියූ ප්‍රාර්ථනා පත්‍රිකාවක්', 'බරැති ලෝහ යතුරක්', 'ලුණු පිරවූ වීදුරු බෝතලයක්'],
        correctIndex: 0,
        explanationSi: 'ඩෙවොන් සරුංගල් නූලට පිත්තල සීනුවක් (brass chime) සහ ගමට වර්ෂාව ප්‍රාර්ථනා කළ සටහනක් බැන්දේය.'
      }
    ],
    chapters: [
      {
        id: 'ck-ch1',
        chapterNumber: 1,
        titleEn: 'Wings of Bamboo and Silk',
        titleSi: 'උණ බට සහ සේද පියාපත්',
        subtitleEn: 'Designing a dream for the sky',
        subtitleSi: 'අහස වෙනුවෙන් සිහිනයක් නිර්මාණය කිරීම',
        summaryEn: 'Living on a windblown hilltop, young Devon studies eagle flights to craft a kite that can reach the highest mountain clouds.',
        summarySi: 'සුළං හමන කඳු මුදුනක වෙසෙන ඩෙවොන්, රාජාලියන් පියාසර කරන අයුරු නිරීක්ෂණය කර ඉහළ වලාකුළු කරා යන සරුංගලයක් තනයි.',
        funFactEn: 'Kites were invented over two thousand years ago in ancient Asia and were even used for measuring wind currents and signaling armies!',
        funFactSi: 'සරුංගල් මීට වසර දෙදහසකට පෙර ආසියාවේ නිර්මාණය වූ අතර හමුදාවන්ට සංඥා කිරීමට සහ සුළං ධාරා මැනීමටද යොදාගන්නා ලදී!',
        keyVocabulary: [
          { word: 'perseverance', phonetic: '/ˌpɜːsɪˈvɪərəns/', sinhalaMeaning: 'නොපසුබට උත්සාහය / අධිෂ්ඨානය', englishDefinition: 'Persistence in doing something despite difficulty', partOfSpeech: 'noun' },
          { word: 'aerodynamic', phonetic: '/ˌeərəʊdaɪˈnæmɪk/', sinhalaMeaning: 'වායුගතික / සුළඟට ඔරොත්තු දෙන', englishDefinition: 'Having a shape that reduces drag from air movement', partOfSpeech: 'adjective' },
          { word: 'soared', phonetic: '/sɔːd/', sinhalaMeaning: 'ඉහළ අහසේ පාවී ගියා', englishDefinition: 'Flew or rose high in the air', partOfSpeech: 'verb' },
          { word: 'currents', phonetic: '/ˈkʌrənts/', sinhalaMeaning: 'වායු හෝ ජල ධාරා', englishDefinition: 'Bodies of air moving in a definite direction', partOfSpeech: 'noun' },
          { word: 'spindle', phonetic: '/ˈspɪndl/', sinhalaMeaning: 'නූල් කැරකැවෙන කැරෝලය', englishDefinition: 'A slender rod on which thread or string is wound', partOfSpeech: 'noun' },
          { word: 'parchment', phonetic: '/ˈpɑːtʃmənt/', sinhalaMeaning: 'පැරණි ලියන කඩදාසිය', englishDefinition: 'Stiff, flat, thin material used for writing', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'ck1-1',
            englishText: 'On the windy plateau of Ella Rock, the autumn winds whipped across emerald valleys with breathtaking power.',
            sinhalaTranslation: 'ඇල්ල රොක් සුළං සහිත සානුව මත, සරත් සෘතුවේ සුළං ධාරා මනස්කාන්ත හරිත නිම්න හරහා ප්‍රචණ්ඩ ශක්තියකින් හමා ගියා.',
            words: [
              { cleanWord: 'on', displayWord: 'On' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'windy', displayWord: 'windy' },
              { cleanWord: 'plateau', displayWord: 'plateau', vocab: { word: 'plateau', phonetic: '/ˈplætəʊ/', sinhalaMeaning: 'සානුව (කඳු මුදුනේ පිහිටි තැන්න)', englishDefinition: 'An area of fairly level high ground', partOfSpeech: 'noun' } },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'ella', displayWord: 'Ella' },
              { cleanWord: 'rock', displayWord: 'Rock,' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'autumn', displayWord: 'autumn', vocab: { word: 'autumn', phonetic: '/ˈɔːtəm/', sinhalaMeaning: 'සරත් සෘතුව', englishDefinition: 'The season between summer and winter', partOfSpeech: 'noun' } },
              { cleanWord: 'winds', displayWord: 'winds' },
              { cleanWord: 'whipped', displayWord: 'whipped', vocab: { word: 'whipped', phonetic: '/wɪpt/', sinhalaMeaning: 'වේගයෙන් හමා ගියා', englishDefinition: 'Moved violently or quickly as wind', partOfSpeech: 'verb' } },
              { cleanWord: 'across', displayWord: 'across' },
              { cleanWord: 'emerald', displayWord: 'emerald', vocab: { word: 'emerald', phonetic: '/ˈemərəld/', sinhalaMeaning: 'මරකත (දීප්තිමත් කොළ පැහැය)', englishDefinition: 'A bright green gemstone color', partOfSpeech: 'adjective' } },
              { cleanWord: 'valleys', displayWord: 'valleys' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'breathtaking', displayWord: 'breathtaking', vocab: { word: 'breathtaking', phonetic: '/ˈbreθteɪkɪŋ/', sinhalaMeaning: 'හුස්ම හිරවන තරම් මනස්කාන්ත', englishDefinition: 'Astonishing or awe-inspiring', partOfSpeech: 'adjective' } },
              { cleanWord: 'power', displayWord: 'power.' }
            ]
          },
          {
            id: 'ck1-2',
            englishText: 'While other children flew small paper diamonds, Devon spent weeks shaving green bamboo into flexible arched ribs.',
            sinhalaTranslation: 'අනෙක් ළමයින් කුඩා කඩදාසි සරුංගල් යවද්දී, ඩෙවොන් සති ගණනක් තිස්සේ කොළ උණ බට නම්‍යශීලී වක්‍රාකාර රාමු ලෙස සකස් කළා.',
            words: [
              { cleanWord: 'while', displayWord: 'While' },
              { cleanWord: 'other', displayWord: 'other' },
              { cleanWord: 'children', displayWord: 'children' },
              { cleanWord: 'flew', displayWord: 'flew' },
              { cleanWord: 'small', displayWord: 'small' },
              { cleanWord: 'paper', displayWord: 'paper' },
              { cleanWord: 'diamonds', displayWord: 'diamonds,', vocab: { word: 'diamonds', phonetic: '/ˈdaɪəməndz/', sinhalaMeaning: 'දියමන්ති හැඩැති සරුංගල්', englishDefinition: 'Rhombus diamond-shaped geometric forms', partOfSpeech: 'noun' } },
              { cleanWord: 'devon', displayWord: 'Devon' },
              { cleanWord: 'spent', displayWord: 'spent' },
              { cleanWord: 'weeks', displayWord: 'weeks' },
              { cleanWord: 'shaving', displayWord: 'shaving', vocab: { word: 'shaving', phonetic: '/ˈʃeɪvɪŋ/', sinhalaMeaning: 'සීරා සිනිඳු කරමින්', englishDefinition: 'Cutting thin slices or layers from wood', partOfSpeech: 'verb' } },
              { cleanWord: 'green', displayWord: 'green' },
              { cleanWord: 'bamboo', displayWord: 'bamboo' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'flexible', displayWord: 'flexible', vocab: { word: 'flexible', phonetic: '/ˈfleksəbl/', sinhalaMeaning: 'නම්‍යශීලී / පහසුවෙන් නැමෙන', englishDefinition: 'Capable of bending easily without breaking', partOfSpeech: 'adjective' } },
              { cleanWord: 'arched', displayWord: 'arched' },
              { cleanWord: 'ribs', displayWord: 'ribs.', vocab: { word: 'ribs', phonetic: '/rɪbz/', sinhalaMeaning: 'රාමුවේ කූරු', englishDefinition: 'Curved structural struts of a frame', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'ck1-3',
            englishText: 'He stitched crimson silk over the frame and attached two long tail streamers cut from shimmering ribbon.',
            sinhalaTranslation: 'ඔහු රාමුව මත රතු පැහැති සේද රෙදි මහන ලද අතර, දිලිසෙන රිබන් පටිවලින් කැපූ දිගු වලිග දෙකක් සවි කළා.',
            words: [
              { cleanWord: 'he', displayWord: 'He' },
              { cleanWord: 'stitched', displayWord: 'stitched', vocab: { word: 'stitched', phonetic: '/stɪtʃt/', sinhalaMeaning: 'නූලෙන් මැසුවා', englishDefinition: 'Fastened or joined with needle and thread', partOfSpeech: 'verb' } },
              { cleanWord: 'crimson', displayWord: 'crimson', vocab: { word: 'crimson', phonetic: '/ˈkrɪmzn/', sinhalaMeaning: 'තද රතු පැහැති', englishDefinition: 'A rich deep red color inclined to purple', partOfSpeech: 'adjective' } },
              { cleanWord: 'silk', displayWord: 'silk' },
              { cleanWord: 'over', displayWord: 'over' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'frame', displayWord: 'frame', vocab: { word: 'frame', phonetic: '/freɪm/', sinhalaMeaning: 'රාමුව', englishDefinition: 'A rigid structure providing support', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'attached', displayWord: 'attached' },
              { cleanWord: 'two', displayWord: 'two' },
              { cleanWord: 'long', displayWord: 'long' },
              { cleanWord: 'tail', displayWord: 'tail' },
              { cleanWord: 'streamers', displayWord: 'streamers', vocab: { word: 'streamers', phonetic: '/ˈstriːməz/', sinhalaMeaning: 'සුළඟේ ලෙළදෙන පටි', englishDefinition: 'Long narrow ribbons fluttering in wind', partOfSpeech: 'noun' } },
              { cleanWord: 'cut', displayWord: 'cut' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'shimmering', displayWord: 'shimmering', vocab: { word: 'shimmering', phonetic: '/ˈʃɪmərɪŋ/', sinhalaMeaning: 'දිලිසෙන / දිදුලන', englishDefinition: 'Shining with a soft tremulous light', partOfSpeech: 'adjective' } },
              { cleanWord: 'ribbon', displayWord: 'ribbon.' }
            ]
          },
          {
            id: 'ck1-4',
            englishText: 'His grandfather had given him three hundred yards of tough braided twine spun from wild hemp fibers.',
            sinhalaTranslation: 'ඔහුගේ සීයා වනගත හන කෙඳිවලින් අඹරන ලද ශක්තිමත් ගෙතූ නූල් යාර තුන්සියයක් ඔහුට ලබාදී තිබුණා.',
            words: [
              { cleanWord: 'his', displayWord: 'His' },
              { cleanWord: 'grandfather', displayWord: 'grandfather' },
              { cleanWord: 'had', displayWord: 'had' },
              { cleanWord: 'given', displayWord: 'given' },
              { cleanWord: 'him', displayWord: 'him' },
              { cleanWord: 'three', displayWord: 'three' },
              { cleanWord: 'hundred', displayWord: 'hundred' },
              { cleanWord: 'yards', displayWord: 'yards', vocab: { word: 'yards', phonetic: '/jɑːdz/', sinhalaMeaning: 'යාර (මිනුම)', englishDefinition: 'Units of linear measure equal to three feet', partOfSpeech: 'noun' } },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'tough', displayWord: 'tough' },
              { cleanWord: 'braided', displayWord: 'braided' },
              { cleanWord: 'twine', displayWord: 'twine,', vocab: { word: 'twine', phonetic: '/twaɪn/', sinhalaMeaning: 'ශක්තිමත් නූල් / කඹය', englishDefinition: 'Strong thread or string composed of two or more strands', partOfSpeech: 'noun' } },
              { cleanWord: 'spun', displayWord: 'spun', vocab: { word: 'spun', phonetic: '/spʌn/', sinhalaMeaning: 'අඹරන ලද (spin හි අතීතය)', englishDefinition: 'Drawn out and twisted into yarn', partOfSpeech: 'verb' } },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'wild', displayWord: 'wild' },
              { cleanWord: 'hemp', displayWord: 'hemp', vocab: { word: 'hemp', phonetic: '/hemp/', sinhalaMeaning: 'හන ගස / හන කෙඳි', englishDefinition: 'Plant providing coarse strong fibers for ropes', partOfSpeech: 'noun' } },
              { cleanWord: 'fibers', displayWord: 'fibers.', vocab: { word: 'fibers', phonetic: '/ˈfaɪbəz/', sinhalaMeaning: 'කෙඳි', englishDefinition: 'Thread-like structures forming vegetable tissue', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'ck1-5',
            englishText: 'As a sudden gust lifted from the abyss, the giant crimson bird leaped from Devon’s hands with an eager roar.',
            sinhalaTranslation: 'ප්‍රපාතයෙන් හදිසි සුළං පහරක් නැඟී එත්ම, මහා රතු කුරුල්ලා උද්‍යෝගිමත් හඬක් නඟමින් ඩෙවොන්ගේ දෑතින් අහසට පැන්නා.',
            words: [
              { cleanWord: 'as', displayWord: 'As' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'sudden', displayWord: 'sudden' },
              { cleanWord: 'gust', displayWord: 'gust', vocab: { word: 'gust', phonetic: '/ɡʌst/', sinhalaMeaning: 'හදිසි සුළං පහර', englishDefinition: 'A brief, strong rush of wind', partOfSpeech: 'noun' } },
              { cleanWord: 'lifted', displayWord: 'lifted' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'abyss', displayWord: 'abyss,', vocab: { word: 'abyss', phonetic: '/əˈbɪs/', sinhalaMeaning: 'ගැඹුරු ප්‍රපාතය', englishDefinition: 'A deep or seemingly bottomless chasm', partOfSpeech: 'noun' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'giant', displayWord: 'giant' },
              { cleanWord: 'crimson', displayWord: 'crimson' },
              { cleanWord: 'bird', displayWord: 'bird' },
              { cleanWord: 'leaped', displayWord: 'leaped' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'devons', displayWord: 'Devon’s' },
              { cleanWord: 'hands', displayWord: 'hands' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'an', displayWord: 'an' },
              { cleanWord: 'eager', displayWord: 'eager', vocab: { word: 'eager', phonetic: '/ˈiːɡə/', sinhalaMeaning: 'උද්‍යෝගිමත් / ආශාවෙන් පිරි', englishDefinition: 'Full of keen interest or excitement', partOfSpeech: 'adjective' } },
              { cleanWord: 'roar', displayWord: 'roar.', vocab: { word: 'roar', phonetic: '/rɔː/', sinhalaMeaning: 'ඝෝෂාව', englishDefinition: 'A full, deep prolonged cry or sound', partOfSpeech: 'noun' } }
            ]
          }
        ]
      },
      {
        id: 'ck-ch2',
        chapterNumber: 2,
        titleEn: 'Dancing Above the Cloud Bank',
        titleSi: 'වලාකුළු තට්ටුවට ඉහළින් කළ නර්තනය',
        subtitleEn: 'The message carried to the mountain peak',
        subtitleSi: 'කඳු මුදුනට ගෙන ගිය පණිවිඩය',
        summaryEn: 'High above the rocky cliff, Devon lets out all the twine until the kite pierces the white mist and glides in the sunny upper sky.',
        summarySi: 'ගල් පර්වතයට ඉහළින්, සුදු මීදුම විනිවිද යමින් සරුංගලය ඉහළ අහසේ සාමකාමීව පාවී යයි.',
        funFactEn: 'High altitude winds called jet streams travel at over one hundred miles per hour and guide weather patterns around our entire planet!',
        funFactSi: 'ජෙට් ස්ට්‍රීම්ස් (Jet streams) නම් අධික උසින් හමන ප්‍රබල සුළං ධාරා මුළු පෘථිවියේම කාලගුණ රටා පාලනය කරයි!',
        keyVocabulary: [
          { word: 'altitude', phonetic: '/ˈæltɪtjuːd/', sinhalaMeaning: 'මුහුදු මට්ටමේ සිට උස', englishDefinition: 'The height of an object above sea level', partOfSpeech: 'noun' },
          { word: 'unwound', phonetic: '/ˌʌnˈwaʊnd/', sinhalaMeaning: 'නූල් ලිහා හැරියා', englishDefinition: 'Uncurled or released from a spool', partOfSpeech: 'verb' },
          { word: 'pierced', phonetic: '/pɪəst/', sinhalaMeaning: 'විදගෙන / විනිවිද ගියා', englishDefinition: 'Made a way through with force', partOfSpeech: 'verb' },
          { word: 'triumph', phonetic: '/ˈtraɪʌmf/', sinhalaMeaning: 'විශිෂ්ට ජයග්‍රහණය', englishDefinition: 'A great victory or achievement', partOfSpeech: 'noun' },
          { word: 'glided', phonetic: '/ˈɡlaɪdɪd/', sinhalaMeaning: 'සිනිඳුව පාවී ගියා', englishDefinition: 'Moved with a smooth continuous motion', partOfSpeech: 'verb' },
          { word: 'exhilarating', phonetic: '/ɪɡˈzɪləreɪtɪŋ/', sinhalaMeaning: 'ඉමහත් සතුටක් දනවන', englishDefinition: 'Making one feel very happy and full of energy', partOfSpeech: 'adjective' }
        ],
        sentences: [
          {
            id: 'ck2-1',
            englishText: 'The hemp twine tugged forcefully against Devon’s wooden spindle as the kite rose higher into the sky.',
            sinhalaTranslation: 'සරුංගලය අහසේ ඉහළටම නඟිද්දී, හන නූල ඩෙවොන්ගේ ලී කැරෝලය දෙසට දැඩි බලයකින් ඇදී ගියා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'hemp', displayWord: 'hemp' },
              { cleanWord: 'twine', displayWord: 'twine' },
              { cleanWord: 'tugged', displayWord: 'tugged', vocab: { word: 'tugged', phonetic: '/tʌɡd/', sinhalaMeaning: 'තදින් ඇදුණා / ඇද්දා', englishDefinition: 'Pulled with a single quick forceful motion', partOfSpeech: 'verb' } },
              { cleanWord: 'forcefully', displayWord: 'forcefully', vocab: { word: 'forcefully', phonetic: '/ˈfɔːsfəli/', sinhalaMeaning: 'ශක්තිමත්ව / බලගතුව', englishDefinition: 'In a strong energetic way', partOfSpeech: 'adverb' } },
              { cleanWord: 'against', displayWord: 'against' },
              { cleanWord: 'devons', displayWord: 'Devon’s' },
              { cleanWord: 'wooden', displayWord: 'wooden' },
              { cleanWord: 'spindle', displayWord: 'spindle', vocab: { word: 'spindle', phonetic: '/ˈspɪndl/', sinhalaMeaning: 'නූල් කැරෝලය', englishDefinition: 'Rotating rod on which string is held', partOfSpeech: 'noun' } },
              { cleanWord: 'as', displayWord: 'as' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'kite', displayWord: 'kite' },
              { cleanWord: 'rose', displayWord: 'rose' },
              { cleanWord: 'higher', displayWord: 'higher' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'sky', displayWord: 'sky.' }
            ]
          },
          {
            id: 'ck2-2',
            englishText: 'It climbed past the circling sea eagles, soared through the damp gray clouds, and burst into bright sunlight above.',
            sinhalaTranslation: 'එය රවුමට පියාඹන මුහුදු රාජාලියන් පසුකර, තෙත් අළු වලාකුළු විනිවිද යමින්, ඉහළින් වූ දීප්තිමත් හිරු එළියට පිවිසුණා.',
            words: [
              { cleanWord: 'it', displayWord: 'It' },
              { cleanWord: 'climbed', displayWord: 'climbed' },
              { cleanWord: 'past', displayWord: 'past' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'circling', displayWord: 'circling' },
              { cleanWord: 'sea', displayWord: 'sea' },
              { cleanWord: 'eagles', displayWord: 'eagles,', vocab: { word: 'eagles', phonetic: '/ˈiːɡlz/', sinhalaMeaning: 'රාජාලියන්', englishDefinition: 'Large birds of prey with keen vision', partOfSpeech: 'noun' } },
              { cleanWord: 'soared', displayWord: 'soared', vocab: { word: 'soared', phonetic: '/sɔːd/', sinhalaMeaning: 'ඉහළ අහසේ පාවී ගියා', englishDefinition: 'Flew high with wide open wings', partOfSpeech: 'verb' } },
              { cleanWord: 'through', displayWord: 'through' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'damp', displayWord: 'damp', vocab: { word: 'damp', phonetic: '/dæmp/', sinhalaMeaning: 'තෙතමනය සහිත', englishDefinition: 'Slightly wet', partOfSpeech: 'adjective' } },
              { cleanWord: 'gray', displayWord: 'gray' },
              { cleanWord: 'clouds', displayWord: 'clouds,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'burst', displayWord: 'burst', vocab: { word: 'burst', phonetic: '/bɜːst/', sinhalaMeaning: 'එකවරම ඇතුළු වුණා', englishDefinition: 'Emerged or moved with sudden force', partOfSpeech: 'verb' } },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'bright', displayWord: 'bright' },
              { cleanWord: 'sunlight', displayWord: 'sunlight' },
              { cleanWord: 'above', displayWord: 'above.' }
            ]
          },
          {
            id: 'ck2-3',
            englishText: 'Down in the valley, villagers gathered in amazement to watch a single red star gliding peacefully above the mist.',
            sinhalaTranslation: 'පහළ නිම්නයේ ගම්වැසියන් මීදුමට ඉහළින් සාමකාමීව පාවෙන තනි රතු තරුවක් දෙස විස්මයෙන් යුතුව බලා සිටියා.',
            words: [
              { cleanWord: 'down', displayWord: 'Down' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'valley', displayWord: 'valley,' },
              { cleanWord: 'villagers', displayWord: 'villagers' },
              { cleanWord: 'gathered', displayWord: 'gathered', vocab: { word: 'gathered', phonetic: '/ˈɡæðəd/', sinhalaMeaning: 'එක්රැස් වුණා', englishDefinition: 'Came together in one place', partOfSpeech: 'verb' } },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'amazement', displayWord: 'amazement', vocab: { word: 'amazement', phonetic: '/əˈmeɪzmənt/', sinhalaMeaning: 'විස්මය / පුදුමය', englishDefinition: 'A feeling of great surprise or wonder', partOfSpeech: 'noun' } },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'watch', displayWord: 'watch' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'single', displayWord: 'single' },
              { cleanWord: 'red', displayWord: 'red' },
              { cleanWord: 'star', displayWord: 'star' },
              { cleanWord: 'gliding', displayWord: 'gliding', vocab: { word: 'gliding', phonetic: '/ˈɡlaɪdɪŋ/', sinhalaMeaning: 'පාවෙමින්', englishDefinition: 'Moving smoothly without effort', partOfSpeech: 'verb' } },
              { cleanWord: 'peacefully', displayWord: 'peacefully' },
              { cleanWord: 'above', displayWord: 'above' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'mist', displayWord: 'mist.', vocab: { word: 'mist', phonetic: '/mɪst/', sinhalaMeaning: 'මීදුම', englishDefinition: 'Water droplets suspended in atmosphere', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'ck2-4',
            englishText: 'Tied to the kite string, a tiny brass bell tinkled softly, sending a gentle song of hope across the peaks.',
            sinhalaTranslation: 'සරුංගල් නූලට බැඳ තිබූ කුඩා පිත්තල සීනුව මෘදුව නාද වෙමින්, කඳු මුදුන් හරහා බලාපොරොත්තුවේ ගීතයක් යැව්වා.',
            words: [
              { cleanWord: 'tied', displayWord: 'Tied' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'kite', displayWord: 'kite' },
              { cleanWord: 'string', displayWord: 'string,' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'brass', displayWord: 'brass' },
              { cleanWord: 'bell', displayWord: 'bell' },
              { cleanWord: 'tinkled', displayWord: 'tinkled', vocab: { word: 'tinkled', phonetic: '/ˈtɪŋkld/', sinhalaMeaning: 'සීනු හඬ නැඟුවා', englishDefinition: 'Made light clear ringing sounds', partOfSpeech: 'verb' } },
              { cleanWord: 'softly', displayWord: 'softly,' },
              { cleanWord: 'sending', displayWord: 'sending' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'gentle', displayWord: 'gentle' },
              { cleanWord: 'song', displayWord: 'song' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'hope', displayWord: 'hope', vocab: { word: 'hope', phonetic: '/həʊp/', sinhalaMeaning: 'බලාපොරොත්තුව', englishDefinition: 'Feeling of expectation and desire for something good', partOfSpeech: 'noun' } },
              { cleanWord: 'across', displayWord: 'across' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'peaks', displayWord: 'peaks.', vocab: { word: 'peaks', phonetic: '/piːks/', sinhalaMeaning: 'කඳු මුදුන්', englishDefinition: 'The pointed summits of mountains', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'ck2-5',
            englishText: 'Devon smiled with triumph, knowing that patience and true imagination can reach heights beyond the highest clouds.',
            sinhalaTranslation: 'ඉවසීම සහ සැබෑ පරිකල්පනය මඟින් ඉහළම වලාකුළුවලටත් ඔබ්බට යා හැකි බව දැනගත් ඩෙවොන් මහත් ජයග්‍රාහී සතුටින් සිනාසුණා.',
            words: [
              { cleanWord: 'devon', displayWord: 'Devon' },
              { cleanWord: 'smiled', displayWord: 'smiled' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'triumph', displayWord: 'triumph,', vocab: { word: 'triumph', phonetic: '/ˈtraɪʌmf/', sinhalaMeaning: 'ජයග්‍රාහී හැඟීම', englishDefinition: 'Great joy from success or victory', partOfSpeech: 'noun' } },
              { cleanWord: 'knowing', displayWord: 'knowing' },
              { cleanWord: 'that', displayWord: 'that' },
              { cleanWord: 'patience', displayWord: 'patience', vocab: { word: 'patience', phonetic: '/ˈpeɪʃns/', sinhalaMeaning: 'ඉවසීම', englishDefinition: 'The capacity to accept or tolerate trouble', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'true', displayWord: 'true' },
              { cleanWord: 'imagination', displayWord: 'imagination', vocab: { word: 'imagination', phonetic: '/ɪˌmædʒɪˈneɪʃn/', sinhalaMeaning: 'පරිකල්පන ශක්තිය', englishDefinition: 'The faculty of forming new ideas or images in mind', partOfSpeech: 'noun' } },
              { cleanWord: 'can', displayWord: 'can' },
              { cleanWord: 'reach', displayWord: 'reach' },
              { cleanWord: 'heights', displayWord: 'heights', vocab: { word: 'heights', phonetic: '/haɪts/', sinhalaMeaning: 'උසස් තලයන්', englishDefinition: 'High places or extreme elevations', partOfSpeech: 'noun' } },
              { cleanWord: 'beyond', displayWord: 'beyond' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'highest', displayWord: 'highest' },
              { cleanWord: 'clouds', displayWord: 'clouds.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'sea-turtle',
    categoryId: 'nature',
    categoryTitleEn: '2. Nature & Wildlife',
    categoryTitleSi: 'සොබාදහම සහ වනජීවී',
    titleEn: 'The Little Sea Turtle’s Midnight Journey',
    titleSi: 'කුඩා මුහුදු කැස්බෑවාගේ මධ්‍යම රාත්‍රී ගමන',
    level: 'Beginner (A1)',
    genreEn: 'Ocean & Wildlife Protection',
    genreSi: 'සාගරය සහ වනජීවී රැකවරණය',
    estimatedMinutes: 5,
    coverAccent: '#0284c7',
    coverImage: seaTurtleCover,
    theme: 'nature',
    quiz: [
      {
        id: 'st-q1',
        questionEn: 'Where was baby turtle Sam born?',
        questionSi: 'සෑම් නම් කුඩා කැස්බෑ පැටියා උපත ලැබුවේ කොහේද?',
        options: ['Beneath the soft golden sand of a tropical beach', 'In a quiet freshwater river lake', 'On a cold mountain cliff'],
        optionsSi: ['ඝර්මකලාපීය වෙරළක මෘදු රන්වන් වැලි යට', 'නිස්කලංක මිරිදිය ගංගා විලක', 'සීතල කඳු බෑවුමක'],
        correctIndex: 0,
        explanationSi: 'කතාවේ සඳහන් වන්නේ සෑම් ඝර්මකලාපීය වෙරළක මෘදු රන්වන් වැලි යට බිත්තරයෙන් එළියට ආ බවයි.'
      },
      {
        id: 'st-q2',
        questionEn: 'What guided Sam safely to the ocean waves?',
        questionSi: 'සෑම්ව සාගර රළ දෙසට ආරක්ෂිතව යොමු කළේ කුමක්ද?',
        options: ['The gentle sea breeze and the rhythmic sound of crashing waves', 'A bright ship lighthouse horn', 'The morning warm sunshine'],
        optionsSi: ['මෘදු මුහුදු සුළඟ සහ රළ බිඳෙන රිද්මයානුකූල ශබ්දය', 'නැවක ප්‍රදීපාගාර නළා හඬ', 'උදෑසන උණුසුම් හිරු එළිය'],
        correctIndex: 0,
        explanationSi: 'මුහුදු සුළඟ සහ රළ පහරේ රිද්මය ඔහුව සාගරය දෙසට නිවැරදිව මඟ පෙන්වීය.'
      }
    ],
    chapters: [
      {
        id: 'st-ch1',
        chapterNumber: 1,
        titleEn: 'The Whispering Golden Sand',
        titleSi: 'රන්වන් වෙරළේ උපත',
        subtitleEn: 'A tiny turtle enters the moonlight',
        subtitleSi: 'පුරසඳ එළියට එබෙන කුඩා කැස්බෑ පැටියා',
        summaryEn: 'Under a shining tropical full moon, a newborn sea turtle named Sam breaks out of his egg on a warm Sri Lankan beach.',
        summarySi: 'ශ්‍රී ලංකාවේ දකුණු වෙරළක පුරසඳ එළිය යටතේ, සෑම් නම් කුඩා කැස්බෑ පැටියා බිත්තරයෙන් එළියට පැමිණෙයි.',
        funFactEn: 'Baby sea turtles find the ocean by crawling toward the brightest horizon, which is the reflection of moonlight on the water!',
        funFactSi: 'මුහුදු කැස්බෑ පැටවුන් සාගරය සොයාගන්නේ ජලය මත පතිත වන සඳ එළියේ දීප්තිය ඔස්සේ ගමන් කිරීමෙනි!',
        keyVocabulary: [
          { word: 'turtle', phonetic: '/ˈtɜːtl/', sinhalaMeaning: 'කැස්බෑවා', englishDefinition: 'A marine reptile with a bony shell', partOfSpeech: 'noun' },
          { word: 'flippers', phonetic: '/ˈflɪpəz/', sinhalaMeaning: 'පිහිනන වරල්', englishDefinition: 'Broad flat limbs adapted for swimming', partOfSpeech: 'noun' },
          { word: 'crawled', phonetic: '/krɔːld/', sinhalaMeaning: 'බඩගාගෙන ගියා', englishDefinition: 'Moved slowly along the ground', partOfSpeech: 'verb' },
          { word: 'surface', phonetic: '/ˈsɜːfɪs/', sinhalaMeaning: 'මතුපිට', englishDefinition: 'The outside or top layer of something', partOfSpeech: 'noun' },
          { word: 'diamonds', phonetic: '/ˈdaɪəməndz/', sinhalaMeaning: 'දියමන්ති', englishDefinition: 'Precious sparkling bright gems', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'st1-1',
            englishText: 'Under the silver light of a tropical full moon, a warm southern beach lay quiet and peaceful.',
            sinhalaTranslation: 'ඝර්මකලාපීය පුරසඳේ රිදී ආලෝකය යටතේ, උණුසුම් දකුණු වෙරළ තීරයක් නිස්කලංකව පැවතුණා.',
            words: [
              { cleanWord: 'under', displayWord: 'Under' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'silver', displayWord: 'silver' },
              { cleanWord: 'light', displayWord: 'light' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'tropical', displayWord: 'tropical' },
              { cleanWord: 'full', displayWord: 'full' },
              { cleanWord: 'moon', displayWord: 'moon,' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'southern', displayWord: 'southern' },
              { cleanWord: 'beach', displayWord: 'beach' },
              { cleanWord: 'lay', displayWord: 'lay' },
              { cleanWord: 'quiet', displayWord: 'quiet' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'peaceful', displayWord: 'peaceful.' }
            ]
          },
          {
            id: 'st1-2',
            englishText: 'Deep beneath the soft golden sand, a tiny baby sea turtle named Sam broke out of his smooth white egg.',
            sinhalaTranslation: 'මෘදු රන්වන් වැලි යට ගැඹුරේ, සෑම් නම් කුඩා මුහුදු කැස්බෑ පැටියා ඔහුගේ සිනිඳු සුදු බිත්තර කටුව බිඳගෙන එළියට ආවා.',
            words: [
              { cleanWord: 'deep', displayWord: 'Deep' },
              { cleanWord: 'beneath', displayWord: 'beneath' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'soft', displayWord: 'soft' },
              { cleanWord: 'golden', displayWord: 'golden' },
              { cleanWord: 'sand', displayWord: 'sand,' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'baby', displayWord: 'baby' },
              { cleanWord: 'sea', displayWord: 'sea' },
              { cleanWord: 'turtle', displayWord: 'turtle', vocab: { word: 'turtle', phonetic: '/ˈtɜːtl/', sinhalaMeaning: 'කැස්බෑවා', englishDefinition: 'A marine reptile with a bony shell', partOfSpeech: 'noun' } },
              { cleanWord: 'named', displayWord: 'named' },
              { cleanWord: 'sam', displayWord: 'Sam' },
              { cleanWord: 'broke', displayWord: 'broke' },
              { cleanWord: 'out', displayWord: 'out' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'smooth', displayWord: 'smooth' },
              { cleanWord: 'white', displayWord: 'white' },
              { cleanWord: 'egg', displayWord: 'egg.' }
            ]
          },
          {
            id: 'st1-3',
            englishText: 'He flapped his tiny dark green flippers and crawled gently upward toward the cool midnight air.',
            sinhalaTranslation: 'ඔහු තම කුඩා තද කොළ පැහැති වරල් සලමින් සිසිල් මධ්‍යම රාත්‍රී වාතය දෙසට ඉහළට බඩගාගෙන ගියා.',
            words: [
              { cleanWord: 'he', displayWord: 'He' },
              { cleanWord: 'flapped', displayWord: 'flapped' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'dark', displayWord: 'dark' },
              { cleanWord: 'green', displayWord: 'green' },
              { cleanWord: 'flippers', displayWord: 'flippers', vocab: { word: 'flippers', phonetic: '/ˈflɪpəz/', sinhalaMeaning: 'පිහිනන වරල්', englishDefinition: 'Broad flat limbs adapted for swimming', partOfSpeech: 'noun' } },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'crawled', displayWord: 'crawled', vocab: { word: 'crawled', phonetic: '/krɔːld/', sinhalaMeaning: 'බඩගාගෙන ගියා', englishDefinition: 'Moved slowly along the ground', partOfSpeech: 'verb' } },
              { cleanWord: 'gently', displayWord: 'gently' },
              { cleanWord: 'upward', displayWord: 'upward' },
              { cleanWord: 'toward', displayWord: 'toward' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'cool', displayWord: 'cool' },
              { cleanWord: 'midnight', displayWord: 'midnight' },
              { cleanWord: 'air', displayWord: 'air.' }
            ]
          },
          {
            id: 'st1-4',
            englishText: 'When Sam reached the surface, the vast Indian Ocean sparkled like a million diamonds.',
            sinhalaTranslation: 'සෑම් මතුපිටට පැමිණි විට, මහා ඉන්දියන් සාගරය දියමන්ති මිලියනයක් සේ දිදුලමින් තිබුණා.',
            words: [
              { cleanWord: 'when', displayWord: 'When' },
              { cleanWord: 'sam', displayWord: 'Sam' },
              { cleanWord: 'reached', displayWord: 'reached' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'surface', displayWord: 'surface,', vocab: { word: 'surface', phonetic: '/ˈsɜːfɪs/', sinhalaMeaning: 'මතුපිට', englishDefinition: 'The outside or top layer of something', partOfSpeech: 'noun' } },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'vast', displayWord: 'vast' },
              { cleanWord: 'indian', displayWord: 'Indian' },
              { cleanWord: 'ocean', displayWord: 'Ocean' },
              { cleanWord: 'sparkled', displayWord: 'sparkled' },
              { cleanWord: 'like', displayWord: 'like' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'million', displayWord: 'million' },
              { cleanWord: 'diamonds', displayWord: 'diamonds.', vocab: { word: 'diamonds', phonetic: '/ˈdaɪəməndz/', sinhalaMeaning: 'දියමන්ති', englishDefinition: 'Precious sparkling bright gems', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'st1-5',
            englishText: 'A gentle sea breeze guided him toward the rhythmic sound of crashing waves.',
            sinhalaTranslation: 'මෘදු මුහුදු සුළඟ රළ බිඳෙන රිද්මයානුකූල ශබ්දය දෙසට ඔහුව යොමු කළා.',
            words: [
              { cleanWord: 'a', displayWord: 'A' },
              { cleanWord: 'gentle', displayWord: 'gentle' },
              { cleanWord: 'sea', displayWord: 'sea' },
              { cleanWord: 'breeze', displayWord: 'breeze' },
              { cleanWord: 'guided', displayWord: 'guided' },
              { cleanWord: 'him', displayWord: 'him' },
              { cleanWord: 'toward', displayWord: 'toward' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'rhythmic', displayWord: 'rhythmic' },
              { cleanWord: 'sound', displayWord: 'sound' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'crashing', displayWord: 'crashing' },
              { cleanWord: 'waves', displayWord: 'waves.' }
            ]
          }
        ]
      },
      {
        id: 'st-ch2',
        chapterNumber: 2,
        titleEn: 'Into the Turquoise Waves',
        titleSi: 'නිල්වන් සාගර රළ අතරට',
        subtitleEn: 'The first swim of freedom',
        subtitleSi: 'නිදහසේ ප්‍රථම පිහිනුම',
        summaryEn: 'Protected by watching villagers, Sam reaches the warm ocean tide and begins his wonderful life at sea.',
        summarySi: 'ගම්වාසීන්ගේ කරුණාවන්ත රැකවරණය මැද, සෑම් සාගර රළ අතරට පිවිස තම නිදහස් දිවිය අරඹයි.',
        funFactEn: 'Sea turtles can migrate thousands of miles across whole oceans, yet return to the exact beach where they were born!',
        funFactSi: 'මුහුදු කැස්බෑවන් සාගරය හරහා සැතපුම් දහස් ගණනක් පිහිනා ගියද, බිත්තර දැමීමට නැවත තමන් උපන් වෙරළටම පැමිණේ!',
        keyVocabulary: [
          { word: 'energy', phonetic: '/ˈenədʒi/', sinhalaMeaning: 'ශක්තිය / ජවය', englishDefinition: 'The strength and vitality required for action', partOfSpeech: 'noun' },
          { word: 'protect', phonetic: '/prəˈtekt/', sinhalaMeaning: 'ආරක්ෂා කරනවා', englishDefinition: 'Keep safe from harm or injury', partOfSpeech: 'verb' },
          { word: 'gracefully', phonetic: '/ˈɡreɪsfəli/', sinhalaMeaning: 'අලංකාර ලෙස', englishDefinition: 'In an attractive and elegant way', partOfSpeech: 'adverb' },
          { word: 'coral', phonetic: '/ˈkɒrəl/', sinhalaMeaning: 'කොරල්පර', englishDefinition: 'Hard stony marine skeletons forming reefs', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'st2-1',
            englishText: 'Sam pushed forward across the cool damp sand with all his youthful energy.',
            sinhalaTranslation: 'සෑම් තම තරුණ ජවය උපරිමයෙන් යොදා සිසිල් තෙත් වැලි තලාව හරහා ඉදිරියට ගියා.',
            words: [
              { cleanWord: 'sam', displayWord: 'Sam' },
              { cleanWord: 'pushed', displayWord: 'pushed' },
              { cleanWord: 'forward', displayWord: 'forward' },
              { cleanWord: 'across', displayWord: 'across' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'cool', displayWord: 'cool' },
              { cleanWord: 'damp', displayWord: 'damp' },
              { cleanWord: 'sand', displayWord: 'sand' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'all', displayWord: 'all' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'youthful', displayWord: 'youthful' },
              { cleanWord: 'energy', displayWord: 'energy.', vocab: { word: 'energy', phonetic: '/ˈenədʒi/', sinhalaMeaning: 'ශක්තිය / ජවය', englishDefinition: 'The strength and vitality required for action', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'st2-2',
            englishText: 'Two kind village children watched quietly from afar with a red torch to protect him from crabs.',
            sinhalaTranslation: 'ගමේ කරුණාවන්ත දරුවන් දෙදෙනෙක් කකුළුවන්ගෙන් ඔහුව ආරක්ෂා කිරීම සඳහා රතු විදුලි පන්දමක් දල්වා දුර සිට නිහඬව බලා සිටියා.',
            words: [
              { cleanWord: 'two', displayWord: 'Two' },
              { cleanWord: 'kind', displayWord: 'kind' },
              { cleanWord: 'village', displayWord: 'village' },
              { cleanWord: 'children', displayWord: 'children' },
              { cleanWord: 'watched', displayWord: 'watched' },
              { cleanWord: 'quietly', displayWord: 'quietly' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'afar', displayWord: 'afar' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'red', displayWord: 'red' },
              { cleanWord: 'torch', displayWord: 'torch' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'protect', displayWord: 'protect', vocab: { word: 'protect', phonetic: '/prəˈtekt/', sinhalaMeaning: 'ආරක්ෂා කරනවා', englishDefinition: 'Keep safe from harm or injury', partOfSpeech: 'verb' } },
              { cleanWord: 'him', displayWord: 'him' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'crabs', displayWord: 'crabs.' }
            ]
          },
          {
            id: 'st2-3',
            englishText: 'Suddenly, the first warm salty wave touched Sam’s tiny nose and lifted him gently.',
            sinhalaTranslation: 'හදිසියේම, පළමු උණුසුම් ලුණු සහිත රළ පහර සෑම්ගේ කුඩා නාසය ස්පර්ශ කර ඔහුව මෘදු ලෙස ඔසවා ගත්තා.',
            words: [
              { cleanWord: 'suddenly', displayWord: 'Suddenly,' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'first', displayWord: 'first' },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'salty', displayWord: 'salty' },
              { cleanWord: 'wave', displayWord: 'wave' },
              { cleanWord: 'touched', displayWord: 'touched' },
              { cleanWord: 'sams', displayWord: "Sam's" },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'nose', displayWord: 'nose' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'lifted', displayWord: 'lifted' },
              { cleanWord: 'him', displayWord: 'him' },
              { cleanWord: 'gently', displayWord: 'gently.' }
            ]
          },
          {
            id: 'st2-4',
            englishText: 'He began to swim gracefully into the deep blue water, feeling completely free.',
            sinhalaTranslation: 'ඔහු සම්පූර්ණ නිදහසක් විඳිමින් ගැඹුරු නිල් දියඹ තුළ අලංකාරව පිහිනන්නට පටන් ගත්තා.',
            words: [
              { cleanWord: 'he', displayWord: 'He' },
              { cleanWord: 'began', displayWord: 'began' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'swim', displayWord: 'swim' },
              { cleanWord: 'gracefully', displayWord: 'gracefully,', vocab: { word: 'gracefully', phonetic: '/ˈɡreɪsfəli/', sinhalaMeaning: 'අලංකාර ලෙස', englishDefinition: 'In an attractive and elegant way', partOfSpeech: 'adverb' } },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'deep', displayWord: 'deep' },
              { cleanWord: 'blue', displayWord: 'blue' },
              { cleanWord: 'water', displayWord: 'water,' },
              { cleanWord: 'feeling', displayWord: 'feeling' },
              { cleanWord: 'completely', displayWord: 'completely' },
              { cleanWord: 'free', displayWord: 'free.' }
            ]
          },
          {
            id: 'st2-5',
            englishText: 'The ocean was now his vast and wonderful home, filled with coral gardens and endless adventures.',
            sinhalaTranslation: 'කොරල් උයන් සහ නිමක් නැති වික්‍රමාන්විතයන්ගෙන් පිරි සාගරය දැන් ඔහුගේ මහා අපූරු නිවහන බවට පත්වුණා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'ocean', displayWord: 'ocean' },
              { cleanWord: 'was', displayWord: 'was' },
              { cleanWord: 'now', displayWord: 'now' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'vast', displayWord: 'vast' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'wonderful', displayWord: 'wonderful' },
              { cleanWord: 'home', displayWord: 'home,' },
              { cleanWord: 'filled', displayWord: 'filled' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'coral', displayWord: 'coral', vocab: { word: 'coral', phonetic: '/ˈkɒrəl/', sinhalaMeaning: 'කොරල්පර', englishDefinition: 'Hard stony marine skeletons forming reefs', partOfSpeech: 'noun' } },
              { cleanWord: 'gardens', displayWord: 'gardens' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'endless', displayWord: 'endless' },
              { cleanWord: 'adventures', displayWord: 'adventures.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'aurora-windmill',
    categoryId: 'scifi',
    categoryTitleEn: '3. Sci-Fi & Inventions',
    categoryTitleSi: 'විද්‍යා ප්‍රබන්ධ සහ නව නිපැයුම්',
    titleEn: 'The Windmill That Caught the Northern Lights',
    titleSi: 'උත්තරාලෝකය අල්ලාගත් සුළං මෝල',
    level: 'Elementary (A2)',
    genreEn: 'Future Science & Wonder',
    genreSi: 'අනාගත විද්‍යාව සහ විස්මය',
    estimatedMinutes: 6,
    coverAccent: '#8b5cf6',
    coverImage: auroraWindmillCover,
    theme: 'scifi',
    quiz: [
      {
        id: 'aw-q1',
        questionEn: 'What special material did young Liam use for the windmill blades?',
        questionSi: 'සුළං මෝලේ පෙති සෑදීම සඳහා ලියාම් භාවිතා කළ විශේෂ ද්‍රව්‍යය කුමක්ද?',
        options: ['Luminous crystal glass that absorbs light', 'Heavy dark iron plates', 'Old wooden oak planks'],
        optionsSi: ['ආලෝකය උරාගන්නා දීප්තිමත් පළිඟු වීදුරු', 'බරැති කළු යකඩ තහඩු', 'පැරණි ඕක් ලී ලෑලි'],
        correctIndex: 0,
        explanationSi: 'ලියාම් සුළං මෝල සඳහා ආලෝකය ගබඩා කරගත හැකි පළිඟු වීදුරු පෙති නිර්මාණය කළේය.'
      },
      {
        id: 'aw-q2',
        questionEn: 'What happened when the northern lights danced above the valley?',
        questionSi: 'නිම්නය ඉහළින් උත්තරාලෝකය නටන්නට පටන් ගත් විට කුමක් සිදුවූයේද?',
        options: ['The windmill glowed and powered all the village street lamps with clean light', 'The windmill broke in the heavy wind', 'The lights disappeared immediately'],
        optionsSi: ['සුළං මෝල බැබළෙමින් මුළු ගමේම පහන් පිරිසිදු ආලෝකයෙන් දැල්වීය', 'තද සුළඟින් සුළං මෝල කැඩී ගියේය', 'ආලෝකය වහාම නැතිවී ගියේය'],
        correctIndex: 0,
        explanationSi: 'සුළං මෝල ස්වභාවික ආලෝකය සහ සුළං බලය එක්කර මුළු ගම්මානයම ආලෝකවත් කළේය.'
      }
    ],
    chapters: [
      {
        id: 'aw-ch1',
        chapterNumber: 1,
        titleEn: 'The Crystal Blades on the Hill',
        titleSi: 'කඳු මුදුනේ පළිඟු පෙති',
        subtitleEn: 'An invention powered by starlight',
        subtitleSi: 'තාරකා එළියෙන් ක්‍රියා කරන නව නිපැයුම',
        summaryEn: 'High upon Starling Hill, young inventor Liam builds a crystal windmill designed to harness clean energy from mountain winds.',
        summarySi: 'ස්ටාර්ලින් කන්ද මුදුනේ, තරුණ නව නිපැයුම්කරු ලියාම් පිරිසිදු බලශක්තිය නිපදවීම සඳහා පළිඟු සුළං මෝලක් හදයි.',
        funFactEn: 'Wind energy has been used by humans for over 2,000 years to pump water and grind grain!',
        funFactSi: 'සුළං බලශක්තිය වසර 2,000 කට වැඩි කාලයක සිට මිනිසුන් විසින් ප්‍රයෝජනයට ගෙන ඇත!',
        keyVocabulary: [
          { word: 'windmill', phonetic: '/ˈwɪndmɪl/', sinhalaMeaning: 'සුළං මෝල', englishDefinition: 'A structure using wind to generate power', partOfSpeech: 'noun' },
          { word: 'crystals', phonetic: '/ˈkrɪstlズ/', sinhalaMeaning: 'පළිඟු', englishDefinition: 'Clear transparent mineral gems', partOfSpeech: 'noun' },
          { word: 'inventor', phonetic: '/ɪnˈventə/', sinhalaMeaning: 'නව නිපැයුම්කරු', englishDefinition: 'A person who invents new devices', partOfSpeech: 'noun' },
          { word: 'harness', phonetic: '/ˈhɑːnɪs/', sinhalaMeaning: 'ප්‍රයෝජනයට ගන්නවා', englishDefinition: 'To capture and control natural power', partOfSpeech: 'verb' }
        ],
        sentences: [
          {
            id: 'aw1-1',
            englishText: 'High upon the grassy slopes of Starling Hill stood the most unusual windmill in the entire country.',
            sinhalaTranslation: 'ස්ටාර්ලින් කන්දේ තණකොළ පිරි බෑවුම මුදුනේ මුළු රටේම අසාමාන්‍යම සුළං මෝල පිහිටා තිබුණා.',
            words: [
              { cleanWord: 'high', displayWord: 'High' },
              { cleanWord: 'upon', displayWord: 'upon' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'grassy', displayWord: 'grassy' },
              { cleanWord: 'slopes', displayWord: 'slopes' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'starling', displayWord: 'Starling' },
              { cleanWord: 'hill', displayWord: 'Hill' },
              { cleanWord: 'stood', displayWord: 'stood' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'most', displayWord: 'most' },
              { cleanWord: 'unusual', displayWord: 'unusual' },
              { cleanWord: 'windmill', displayWord: 'windmill', vocab: { word: 'windmill', phonetic: '/ˈwɪndmɪl/', sinhalaMeaning: 'සුළං මෝල', englishDefinition: 'A structure using wind to generate power', partOfSpeech: 'noun' } },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'entire', displayWord: 'entire' },
              { cleanWord: 'country', displayWord: 'country.' }
            ]
          },
          {
            id: 'aw1-2',
            englishText: 'Instead of rough timber, sixteen-year-old Liam crafted its four giant blades from smooth, luminous crystal.',
            sinhalaTranslation: 'රළු ලී වෙනුවට, දහසය හැවිරිදි ලියාම් එහි යෝධ පෙති හතර සිනිඳු, දීප්තිමත් පළිඟු වලින් නිමවා තිබුණා.',
            words: [
              { cleanWord: 'instead', displayWord: 'Instead' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'rough', displayWord: 'rough' },
              { cleanWord: 'timber', displayWord: 'timber,' },
              { cleanWord: 'sixteenyearold', displayWord: 'sixteen-year-old' },
              { cleanWord: 'liam', displayWord: 'Liam' },
              { cleanWord: 'crafted', displayWord: 'crafted' },
              { cleanWord: 'its', displayWord: 'its' },
              { cleanWord: 'four', displayWord: 'four' },
              { cleanWord: 'giant', displayWord: 'giant' },
              { cleanWord: 'blades', displayWord: 'blades' },
              { cleanWord: 'from', displayWord: 'from' },
              { cleanWord: 'smooth', displayWord: 'smooth,' },
              { cleanWord: 'luminous', displayWord: 'luminous' },
              { cleanWord: 'crystal', displayWord: 'crystal.', vocab: { word: 'crystals', phonetic: '/ˈkrɪstlズ/', sinhalaMeaning: 'පළිඟු', englishDefinition: 'Clear transparent mineral gems', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'aw1-3',
            englishText: 'The villagers often wondered if a boy with simple tools could truly capture the invisible power of mountain storms.',
            sinhalaTranslation: 'සරල ආයුධ ඇති පිරිමි ළමයෙකුට සැබවින්ම කඳුකර කුණාටුවල අදෘශ්‍යමාන බලය අල්ලාගත හැකිදැයි ගම්වාසීන් නිතර මවිත වුණා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'villagers', displayWord: 'villagers' },
              { cleanWord: 'often', displayWord: 'often' },
              { cleanWord: 'wondered', displayWord: 'wondered' },
              { cleanWord: 'if', displayWord: 'if' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'boy', displayWord: 'boy' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'simple', displayWord: 'simple' },
              { cleanWord: 'tools', displayWord: 'tools' },
              { cleanWord: 'could', displayWord: 'could' },
              { cleanWord: 'truly', displayWord: 'truly' },
              { cleanWord: 'capture', displayWord: 'capture' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'invisible', displayWord: 'invisible' },
              { cleanWord: 'power', displayWord: 'power' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'mountain', displayWord: 'mountain' },
              { cleanWord: 'storms', displayWord: 'storms.' }
            ]
          },
          {
            id: 'aw1-4',
            englishText: 'Liam worked through chilly autumn nights, connecting copper coils and checking every tiny cog with care.',
            sinhalaTranslation: 'ලියාම් තඹ දඟර සම්බන්ධ කරමින් සහ සෑම කුඩා දැති රෝදයක්ම ඉතා සැලකිල්ලෙන් පරීක්ෂා කරමින් සීතල සරත් රාත්‍රීන් පුරා වෙහෙසුණා.',
            words: [
              { cleanWord: 'liam', displayWord: 'Liam' },
              { cleanWord: 'worked', displayWord: 'worked' },
              { cleanWord: 'through', displayWord: 'through' },
              { cleanWord: 'chilly', displayWord: 'chilly' },
              { cleanWord: 'autumn', displayWord: 'autumn' },
              { cleanWord: 'nights', displayWord: 'nights,' },
              { cleanWord: 'connecting', displayWord: 'connecting' },
              { cleanWord: 'copper', displayWord: 'copper' },
              { cleanWord: 'coils', displayWord: 'coils' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'checking', displayWord: 'checking' },
              { cleanWord: 'every', displayWord: 'every' },
              { cleanWord: 'tiny', displayWord: 'tiny' },
              { cleanWord: 'cog', displayWord: 'cog' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'care', displayWord: 'care.' }
            ]
          },
          {
            id: 'aw1-5',
            englishText: 'He dreamed of providing free, gentle warmth to every cottage when the bitter winter arrived.',
            sinhalaTranslation: 'දැඩි ශීත කාලය පැමිණි විට සෑම නිවසකටම නොමිලේ, මෘදු උණුසුමක් ලබාදීම ඔහුගේ සිහිනය වුණා.',
            words: [
              { cleanWord: 'he', displayWord: 'He' },
              { cleanWord: 'dreamed', displayWord: 'dreamed' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'providing', displayWord: 'providing' },
              { cleanWord: 'free', displayWord: 'free,' },
              { cleanWord: 'gentle', displayWord: 'gentle' },
              { cleanWord: 'warmth', displayWord: 'warmth' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'every', displayWord: 'every' },
              { cleanWord: 'cottage', displayWord: 'cottage' },
              { cleanWord: 'when', displayWord: 'when' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'bitter', displayWord: 'bitter' },
              { cleanWord: 'winter', displayWord: 'winter' },
              { cleanWord: 'arrived', displayWord: 'arrived.' }
            ]
          }
        ]
      },
      {
        id: 'aw-ch2',
        chapterNumber: 2,
        titleEn: 'The Night the Valley Glowed',
        titleSi: 'නිම්නය ආලෝකවත් වූ රාත්‍රිය',
        subtitleEn: 'Emerald ribbons across the dark sky',
        subtitleSi: 'අඳුරු අහසේ මරකත පැහැති ආලෝක රේඛා',
        summaryEn: 'When rare aurora lights sweep the sky, Liam’s windmill generates a cascade of pure, radiant energy for the village.',
        summarySi: 'දුර්ලභ උත්තරාලෝකය අහසේ දිස්වන විට, ලියාම්ගේ සුළං මෝල ගම්මානයටම දීප්තිමත් බලශක්තියක් ලබාදෙයි.',
        funFactEn: 'The northern lights (aurora borealis) are caused by charged particles from the sun colliding with gases in Earth’s atmosphere!',
        funFactSi: 'උත්තරාලෝකය ඇතිවන්නේ සූර්යයාගෙන් නිකුත් වන අංශු පෘථිවි වායුගෝලයේ වායූන් සමඟ ගැටීමෙනි!',
        keyVocabulary: [
          { word: 'aurora', phonetic: '/ɔːˈrɔːrə/', sinhalaMeaning: 'උත්තරාලෝකය', englishDefinition: 'A natural light display in the sky', partOfSpeech: 'noun' },
          { word: 'spinning', phonetic: '/ˈspɪnɪŋ/', sinhalaMeaning: 'කැරකෙනවා', englishDefinition: 'Rotating rapidly around an axis', partOfSpeech: 'verb' },
          { word: 'cheered', phonetic: '/tʃɪəd/', sinhalaMeaning: 'ප්‍රීති ඝෝෂා කළා', englishDefinition: 'Shouted with joy and approval', partOfSpeech: 'verb' },
          { word: 'radiant', phonetic: '/ˈreɪdiənt/', sinhalaMeaning: 'දීප්තිමත් / බබළන', englishDefinition: 'Shining brightly and warmly', partOfSpeech: 'adjective' }
        ],
        sentences: [
          {
            id: 'aw2-1',
            englishText: 'On a freezing December evening, glowing green and purple ribbons appeared across the northern sky.',
            sinhalaTranslation: 'සීතල දෙසැම්බර් සැඳෑවක, උතුරු අහස පුරා දීප්තිමත් කොළ සහ දම් පැහැති ආලෝක රේඛා දිස්වුණා.',
            words: [
              { cleanWord: 'on', displayWord: 'On' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'freezing', displayWord: 'freezing' },
              { cleanWord: 'december', displayWord: 'December' },
              { cleanWord: 'evening', displayWord: 'evening,' },
              { cleanWord: 'glowing', displayWord: 'glowing' },
              { cleanWord: 'green', displayWord: 'green' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'purple', displayWord: 'purple' },
              { cleanWord: 'ribbons', displayWord: 'ribbons' },
              { cleanWord: 'appeared', displayWord: 'appeared' },
              { cleanWord: 'across', displayWord: 'across' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'northern', displayWord: 'northern' },
              { cleanWord: 'sky', displayWord: 'sky.', vocab: { word: 'aurora', phonetic: '/ɔːˈrɔːrə/', sinhalaMeaning: 'උත්තරාලෝකය', englishDefinition: 'A natural light display in the sky', partOfSpeech: 'noun' } }
            ]
          },
          {
            id: 'aw2-2',
            englishText: 'The crystal windmill blades caught the cosmic light and began spinning with a harmonious hum.',
            sinhalaTranslation: 'පළිඟු සුළං මෝල් පෙති ඒ ආකාශ ආලෝකය උරාගෙන සුමධුර නාදයක් සමඟ වේගයෙන් කැරකෙන්නට පටන් ගත්තා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'crystal', displayWord: 'crystal' },
              { cleanWord: 'windmill', displayWord: 'windmill' },
              { cleanWord: 'blades', displayWord: 'blades' },
              { cleanWord: 'caught', displayWord: 'caught' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'cosmic', displayWord: 'cosmic' },
              { cleanWord: 'light', displayWord: 'light' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'began', displayWord: 'began' },
              { cleanWord: 'spinning', displayWord: 'spinning', vocab: { word: 'spinning', phonetic: '/ˈspɪnɪŋ/', sinhalaMeaning: 'කැරකෙනවා', englishDefinition: 'Rotating rapidly around an axis', partOfSpeech: 'verb' } },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'harmonious', displayWord: 'harmonious' },
              { cleanWord: 'hum', displayWord: 'hum.' }
            ]
          },
          {
            id: 'aw2-3',
            englishText: 'One by one, the lanterns along the village roads flickered softly and burst into radiant golden light.',
            sinhalaTranslation: 'එකින් එක ගමේ වීදි පහන් මෘදු ලෙස දැල්වී දීප්තිමත් රන්වන් ආලෝකයෙන් බැබළුණා.',
            words: [
              { cleanWord: 'one', displayWord: 'One' },
              { cleanWord: 'by', displayWord: 'by' },
              { cleanWord: 'one', displayWord: 'one,' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'lanterns', displayWord: 'lanterns' },
              { cleanWord: 'along', displayWord: 'along' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'village', displayWord: 'village' },
              { cleanWord: 'roads', displayWord: 'roads' },
              { cleanWord: 'flickered', displayWord: 'flickered' },
              { cleanWord: 'softly', displayWord: 'softly' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'burst', displayWord: 'burst' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'radiant', displayWord: 'radiant', vocab: { word: 'radiant', phonetic: '/ˈreɪdiənt/', sinhalaMeaning: 'දීප්තිමත් / බබළන', englishDefinition: 'Shining brightly and warmly', partOfSpeech: 'adjective' } },
              { cleanWord: 'golden', displayWord: 'golden' },
              { cleanWord: 'light', displayWord: 'light.' }
            ]
          },
          {
            id: 'aw2-4',
            englishText: 'Families stepped out of their houses in amazement, feeling safe and warm under the glowing sky.',
            sinhalaTranslation: 'පවුල් පිටින් මවිතයෙන් නිවෙස්වලින් එළියට පැමිණ, බබළන අහස යටතේ ආරක්ෂිත සහ උණුසුම් හැඟීමක් ලැබුවා.',
            words: [
              { cleanWord: 'families', displayWord: 'Families' },
              { cleanWord: 'stepped', displayWord: 'stepped' },
              { cleanWord: 'out', displayWord: 'out' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'their', displayWord: 'their' },
              { cleanWord: 'houses', displayWord: 'houses' },
              { cleanWord: 'in', displayWord: 'in' },
              { cleanWord: 'amazement', displayWord: 'amazement,' },
              { cleanWord: 'feeling', displayWord: 'feeling' },
              { cleanWord: 'safe', displayWord: 'safe' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'under', displayWord: 'under' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'glowing', displayWord: 'glowing' },
              { cleanWord: 'sky', displayWord: 'sky.' }
            ]
          },
          {
            id: 'aw2-5',
            englishText: 'The villagers cheered loudly for Liam, whose clever invention turned cold night winds into pure warmth.',
            sinhalaTranslation: 'සීතල රාත්‍රී සුළඟ පිරිසිදු උණුසුමක් බවට පත් කළ ලියාම්ගේ බුද්ධිමත් සොයාගැනීමට ගම්වැසියන් මහත් සේ ප්‍රීති ඝෝෂා කළා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'villagers', displayWord: 'villagers' },
              { cleanWord: 'cheered', displayWord: 'cheered', vocab: { word: 'cheered', phonetic: '/tʃɪəd/', sinhalaMeaning: 'ප්‍රීති ඝෝෂා කළා', englishDefinition: 'Shouted with joy and approval', partOfSpeech: 'verb' } },
              { cleanWord: 'loudly', displayWord: 'loudly' },
              { cleanWord: 'for', displayWord: 'for' },
              { cleanWord: 'liam', displayWord: 'Liam,' },
              { cleanWord: 'whose', displayWord: 'whose' },
              { cleanWord: 'clever', displayWord: 'clever' },
              { cleanWord: 'invention', displayWord: 'invention' },
              { cleanWord: 'turned', displayWord: 'turned' },
              { cleanWord: 'cold', displayWord: 'cold' },
              { cleanWord: 'night', displayWord: 'night' },
              { cleanWord: 'winds', displayWord: 'winds' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'pure', displayWord: 'pure' },
              { cleanWord: 'warmth', displayWord: 'warmth.' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'village-potter',
    categoryId: 'kindness',
    categoryTitleEn: '4. Kindness & Community',
    categoryTitleSi: 'දයාව සහ මිත්‍රත්වය',
    titleEn: 'The Village Potter’s Blue Teapot',
    titleSi: 'ගමේ කුඹල්කරුගේ නිල් තේ බඳුන',
    level: 'Beginner (A1)',
    genreEn: 'Peace & Neighborhood',
    genreSi: 'සාමය සහ අසල්වැසි සෙනෙහස',
    estimatedMinutes: 5,
    coverAccent: '#d97706',
    coverImage: villagePotterCover,
    theme: 'community',
    quiz: [
      {
        id: 'vp-q1',
        questionEn: 'What did Grandma Mala craft out of the riverbed clay?',
        questionSi: 'ගඟ ඉවුරේ මැටිවලින් මාලා ආච්චි හැදුවේ කුමක්ද?',
        options: ['A beautiful blue ceramic teapot painted with jasmine flowers', 'A tall red clay flower vase', 'A heavy baking pot'],
        optionsSi: ['පිච්ච මල් ඇඳි අලංකාර නිල් මැටි තේ බඳුනක්', 'උස රතු මැටි මල් පෝච්චියක්', 'බරැති පාන් පුළුස්සන බඳුනක්'],
        correctIndex: 0,
        explanationSi: 'මාලා ආච්චි පිරිසිදු නිල් පැහැති අලංකාර තේ බඳුනක් හැදුවාය.'
      },
      {
        id: 'vp-q2',
        questionEn: 'How did the blue teapot help the two arguing neighbors?',
        questionSi: 'නිල් තේ බඳුන තරහ වී සිටි අසල්වැසියන් දෙදෙනාට උපකාර කළේ කෙසේද?',
        options: ['They sat together on the bench, shared hot ginger tea, and became friends again', 'They bought it at the town market', 'They broke it by accident'],
        optionsSi: ['ඔවුන් බංකුවේ එකට වාඩි වී උණුසුම් ඉඟුරු තේ බී නැවත මිතුරන් වුණා', 'ඔවුන් එය නගර වෙළඳපොලෙන් මිලදී ගත්තා', 'ඔවුන් අතින් එය නොදැනුවත්ව බිඳී ගියා'],
        correctIndex: 0,
        explanationSi: 'උණුසුම් තේ කෝප්පය බෙදාගැනීමෙන් ඔවුන්ගේ ආරවුල විසඳී සිනහව පැමිණියේය.'
      }
    ],
    chapters: [
      {
        id: 'vp-ch1',
        chapterNumber: 1,
        titleEn: 'Soft Clay and Warm Sunlight',
        titleSi: 'මෘදු මැටි සහ උණුසුම් හිරු එළිය',
        subtitleEn: 'The art of shaping peace',
        subtitleSi: 'සාමයේ හැඩතල මවන කලාව',
        summaryEn: 'In a peaceful riverside village, kind Grandma Mala shapes a magnificent blue clay teapot in her sunlit pottery workshop.',
        summarySi: 'නිස්කලංක ගම්මානයක, කරුණාවන්ත මාලා ආච්චි හිරු එළිය වැටෙන තම වැඩපොළේ අලංකාර නිල් තේ බඳුනක් සාදයි.',
        funFactEn: 'Pottery is one of the oldest human crafts in history, dating back over 20,000 years!',
        funFactSi: 'කුඹල් කර්මාන්තය වසර 20,000 කට වඩා පැරණි, මිනිසාගේ මුල්ම ශිල්ප ක්‍රමවලින් එකකි!',
        keyVocabulary: [
          { word: 'potter', phonetic: '/ˈpɒtə/', sinhalaMeaning: 'කුඹල්කරු', englishDefinition: 'A person who makes ceramic pottery', partOfSpeech: 'noun' },
          { word: 'workshop', phonetic: '/ˈwɜːkʃɒp/', sinhalaMeaning: 'වැඩපොළ', englishDefinition: 'A room where things are crafted', partOfSpeech: 'noun' },
          { word: 'wheel', phonetic: '/wiːl/', sinhalaMeaning: 'සකපෝරුව / රෝදය', englishDefinition: 'A revolving disc used in pottery', partOfSpeech: 'noun' },
          { word: 'delicate', phonetic: '/ˈdelɪkət/', sinhalaMeaning: 'සුන්දර / සියුම්', englishDefinition: 'Fine and subtle in quality', partOfSpeech: 'adjective' }
        ],
        sentences: [
          {
            id: 'vp1-1',
            englishText: 'In a quiet village beside the Mahaweli River, Grandma Mala loved the smell of wet river clay.',
            sinhalaTranslation: 'මහවැලි ගඟ අසල නිස්කලංක ගම්මානයක, මාලා ආච්චි තෙත් ගං ඉවුරු මැටි සුවඳට බෙහෙවින් ආදරය කළා.',
            words: [
              { cleanWord: 'in', displayWord: 'In' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'quiet', displayWord: 'quiet' },
              { cleanWord: 'village', displayWord: 'village' },
              { cleanWord: 'beside', displayWord: 'beside' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'mahaweli', displayWord: 'Mahaweli' },
              { cleanWord: 'river', displayWord: 'River,' },
              { cleanWord: 'grandma', displayWord: 'Grandma' },
              { cleanWord: 'mala', displayWord: 'Mala' },
              { cleanWord: 'loved', displayWord: 'loved' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'smell', displayWord: 'smell' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'wet', displayWord: 'wet' },
              { cleanWord: 'river', displayWord: 'river' },
              { cleanWord: 'clay', displayWord: 'clay.' }
            ]
          },
          {
            id: 'vp1-2',
            englishText: 'Every afternoon, warm sunlight poured into her cozy workshop while her wooden potter wheel turned.',
            sinhalaTranslation: 'සෑම දහවලකම, ඇගේ ලී සකපෝරුව කැරකෙද්දී ඇගේ සුවපහසු වැඩපොළ තුළට උණුසුම් හිරු එළිය ගලා ආවා.',
            words: [
              { cleanWord: 'every', displayWord: 'Every' },
              { cleanWord: 'afternoon', displayWord: 'afternoon,' },
              { cleanWord: 'warm', displayWord: 'warm' },
              { cleanWord: 'sunlight', displayWord: 'sunlight' },
              { cleanWord: 'poured', displayWord: 'poured' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'her', displayWord: 'her' },
              { cleanWord: 'cozy', displayWord: 'cozy' },
              { cleanWord: 'workshop', displayWord: 'workshop,', vocab: { word: 'workshop', phonetic: '/ˈwɜːkʃɒp/', sinhalaMeaning: 'වැඩපොළ', englishDefinition: 'A room where things are crafted', partOfSpeech: 'noun' } },
              { cleanWord: 'while', displayWord: 'while' },
              { cleanWord: 'her', displayWord: 'her' },
              { cleanWord: 'wooden', displayWord: 'wooden' },
              { cleanWord: 'potter', displayWord: 'potter', vocab: { word: 'potter', phonetic: '/ˈpɒtə/', sinhalaMeaning: 'කුඹල්කරු', englishDefinition: 'A person who makes ceramic pottery', partOfSpeech: 'noun' } },
              { cleanWord: 'wheel', displayWord: 'wheel', vocab: { word: 'wheel', phonetic: '/wiːl/', sinhalaMeaning: 'සකපෝරුව / රෝදය', englishDefinition: 'A revolving disc used in pottery', partOfSpeech: 'noun' } },
              { cleanWord: 'turned', displayWord: 'turned.' }
            ]
          },
          {
            id: 'vp1-3',
            englishText: 'With wrinkled but steady hands, she shaped a special round teapot with a gracefully curved handle.',
            sinhalaTranslation: 'රැලි වැටුණු නමුත් ස්ථිර දෑතින්, ඇය අලංකාර ලෙස වක්‍ර වූ අතක් සහිත විශේෂ රවුම් තේ බඳුනක් හැඩගැසුවා.',
            words: [
              { cleanWord: 'with', displayWord: 'With' },
              { cleanWord: 'wrinkled', displayWord: 'wrinkled' },
              { cleanWord: 'but', displayWord: 'but' },
              { cleanWord: 'steady', displayWord: 'steady' },
              { cleanWord: 'hands', displayWord: 'hands,' },
              { cleanWord: 'she', displayWord: 'she' },
              { cleanWord: 'shaped', displayWord: 'shaped' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'special', displayWord: 'special' },
              { cleanWord: 'round', displayWord: 'round' },
              { cleanWord: 'teapot', displayWord: 'teapot' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'gracefully', displayWord: 'gracefully' },
              { cleanWord: 'curved', displayWord: 'curved' },
              { cleanWord: 'handle', displayWord: 'handle.' }
            ]
          },
          {
            id: 'vp1-4',
            englishText: 'She painted delicate white jasmine blossoms across its bright sky-blue glaze.',
            sinhalaTranslation: 'ඇය එහි දීප්තිමත් අහස්-නිල් පැහැති මතුපිට පුරා සියුම් සුදු පිච්ච මල් මෝස්තර ඇන්දා.',
            words: [
              { cleanWord: 'she', displayWord: 'She' },
              { cleanWord: 'painted', displayWord: 'painted' },
              { cleanWord: 'delicate', displayWord: 'delicate', vocab: { word: 'delicate', phonetic: '/ˈdelɪkət/', sinhalaMeaning: 'සුන්දර / සියුම්', englishDefinition: 'Fine and subtle in quality', partOfSpeech: 'adjective' } },
              { cleanWord: 'white', displayWord: 'white' },
              { cleanWord: 'jasmine', displayWord: 'jasmine' },
              { cleanWord: 'blossoms', displayWord: 'blossoms' },
              { cleanWord: 'across', displayWord: 'across' },
              { cleanWord: 'its', displayWord: 'its' },
              { cleanWord: 'bright', displayWord: 'bright' },
              { cleanWord: 'skyblue', displayWord: 'sky-blue' },
              { cleanWord: 'glaze', displayWord: 'glaze.' }
            ]
          },
          {
            id: 'vp1-5',
            englishText: 'Grandma Mala smiled and whispered that this pot would soon bring peace to troubled hearts.',
            sinhalaTranslation: 'මාලා ආච්චි සිනාසෙමින් මුමුණා කීවේ මෙම බඳුන ඉක්මනින්ම සිත් තැවුල් ඇති අය වෙත සාමය ගෙනෙනු ඇති බවයි.',
            words: [
              { cleanWord: 'grandma', displayWord: 'Grandma' },
              { cleanWord: 'mala', displayWord: 'Mala' },
              { cleanWord: 'smiled', displayWord: 'smiled' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'whispered', displayWord: 'whispered' },
              { cleanWord: 'that', displayWord: 'that' },
              { cleanWord: 'this', displayWord: 'this' },
              { cleanWord: 'pot', displayWord: 'pot' },
              { cleanWord: 'would', displayWord: 'would' },
              { cleanWord: 'soon', displayWord: 'soon' },
              { cleanWord: 'bring', displayWord: 'bring' },
              { cleanWord: 'peace', displayWord: 'peace' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'troubled', displayWord: 'troubled' },
              { cleanWord: 'hearts', displayWord: 'hearts.' }
            ]
          }
        ]
      },
      {
        id: 'vp-ch2',
        chapterNumber: 2,
        titleEn: 'Tea of Forgiveness',
        titleSi: 'සමාව දීමේ උණුසුම් තේ පැන්',
        subtitleEn: 'Hot ginger tea and old friends',
        subtitleSi: 'ඉඟුරු තේ සහ පැරණි මිත්‍රත්වය',
        summaryEn: 'When two feuding farmers visit her porch, Grandma Mala serves steaming ginger tea from her blue teapot and mends their friendship.',
        summarySi: 'තරහ වී සිටි ගොවීන් දෙදෙනෙක් පැමිණි විට, මාලා ආච්චි නිල් තේ බඳුනෙන් ඉඟුරු තේ පිළිගන්වා ඔවුන්ගේ මිත්‍රත්වය නැවත ඇති කරයි.',
        funFactEn: 'Ceylon tea is renowned worldwide, and sharing tea with visitors is one of Sri Lanka’s warmest hospitality traditions!',
        funFactSi: 'ලංකා තේ ලොව පුරා ප්‍රසිද්ධ අතර, අමුත්තන්ට තේ පිළිගැන්වීම ශ්‍රී ලාංකික ආගන්තුක සත්කාරයේ උතුම් සිරිතකි!',
        keyVocabulary: [
          { word: 'ginger', phonetic: '/ˈdʒɪndʒə/', sinhalaMeaning: 'ඉඟුරු', englishDefinition: 'A hot fragrant kitchen root spice', partOfSpeech: 'noun' },
          { word: 'neighbors', phonetic: '/ˈneɪbəz/', sinhalaMeaning: 'අසල්වැසියන්', englishDefinition: 'People living near each other', partOfSpeech: 'noun' },
          { word: 'laughter', phonetic: '/ˈlɑːftə/', sinhalaMeaning: 'සිනහව', englishDefinition: 'The sound of amusement and joy', partOfSpeech: 'noun' },
          { word: 'forgiveness', phonetic: '/fəˈɡɪvnəs/', sinhalaMeaning: 'සමාව දීම', englishDefinition: 'Letting go of anger and grudge', partOfSpeech: 'noun' }
        ],
        sentences: [
          {
            id: 'vp2-1',
            englishText: 'The next morning, two neighboring farmers named Sunil and Rohan sat on the wooden bench, frowning and looking away.',
            sinhalaTranslation: 'පසුදා උදෑසන, සුනිල් සහ රොහාන් නම් අසල්වැසි ගොවීන් දෙදෙනා නොරිස්සුම් මුහුණින් බංකුවේ දෙපැත්ත බලාගෙන වාඩි වී සිටියා.',
            words: [
              { cleanWord: 'the', displayWord: 'The' },
              { cleanWord: 'next', displayWord: 'next' },
              { cleanWord: 'morning', displayWord: 'morning,' },
              { cleanWord: 'two', displayWord: 'two' },
              { cleanWord: 'neighboring', displayWord: 'neighboring' },
              { cleanWord: 'farmers', displayWord: 'farmers' },
              { cleanWord: 'named', displayWord: 'named' },
              { cleanWord: 'sunil', displayWord: 'Sunil' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'rohan', displayWord: 'Rohan' },
              { cleanWord: 'sat', displayWord: 'sat' },
              { cleanWord: 'on', displayWord: 'on' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'wooden', displayWord: 'wooden' },
              { cleanWord: 'bench', displayWord: 'bench,' },
              { cleanWord: 'frowning', displayWord: 'frowning' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'looking', displayWord: 'looking' },
              { cleanWord: 'away', displayWord: 'away.' }
            ]
          },
          {
            id: 'vp2-2',
            englishText: 'They had argued over a broken fence and had refused to speak to each other for an entire month.',
            sinhalaTranslation: 'කැඩුණු වැටක් නිසා ඔවුන් වාද විවාද කරගෙන මුළු මාසයක් තිස්සේ එකිනෙකා සමඟ කතා නොකර සිටියා.',
            words: [
              { cleanWord: 'they', displayWord: 'They' },
              { cleanWord: 'had', displayWord: 'had' },
              { cleanWord: 'argued', displayWord: 'argued' },
              { cleanWord: 'over', displayWord: 'over' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'broken', displayWord: 'broken' },
              { cleanWord: 'fence', displayWord: 'fence' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'had', displayWord: 'had' },
              { cleanWord: 'refused', displayWord: 'refused' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'speak', displayWord: 'speak' },
              { cleanWord: 'to', displayWord: 'to' },
              { cleanWord: 'each', displayWord: 'each' },
              { cleanWord: 'other', displayWord: 'other' },
              { cleanWord: 'for', displayWord: 'for' },
              { cleanWord: 'an', displayWord: 'an' },
              { cleanWord: 'entire', displayWord: 'entire' },
              { cleanWord: 'month', displayWord: 'month.' }
            ]
          },
          {
            id: 'vp2-3',
            englishText: 'Grandma Mala brought out the shiny blue teapot, pouring steaming fragrant ginger tea into two clay cups.',
            sinhalaTranslation: 'මාලා ආච්චි දිදුලන නිල් තේ බඳුන රැගෙන විත්, දුම් දමන සුවඳැති ඉඟුරු තේ මැටි කෝප්ප දෙකකට වත් කළා.',
            words: [
              { cleanWord: 'grandma', displayWord: 'Grandma' },
              { cleanWord: 'mala', displayWord: 'Mala' },
              { cleanWord: 'brought', displayWord: 'brought' },
              { cleanWord: 'out', displayWord: 'out' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'shiny', displayWord: 'shiny' },
              { cleanWord: 'blue', displayWord: 'blue' },
              { cleanWord: 'teapot', displayWord: 'teapot,' },
              { cleanWord: 'pouring', displayWord: 'pouring' },
              { cleanWord: 'steaming', displayWord: 'steaming' },
              { cleanWord: 'fragrant', displayWord: 'fragrant' },
              { cleanWord: 'ginger', displayWord: 'ginger', vocab: { word: 'ginger', phonetic: '/ˈdʒɪndʒə/', sinhalaMeaning: 'ඉඟුරු', englishDefinition: 'A hot fragrant kitchen root spice', partOfSpeech: 'noun' } },
              { cleanWord: 'tea', displayWord: 'tea' },
              { cleanWord: 'into', displayWord: 'into' },
              { cleanWord: 'two', displayWord: 'two' },
              { cleanWord: 'clay', displayWord: 'clay' },
              { cleanWord: 'cups', displayWord: 'cups.' }
            ]
          },
          {
            id: 'vp2-4',
            englishText: 'As the spicy sweetness warmed their hands, Sunil looked up and admitted his mistake with a gentle smile.',
            sinhalaTranslation: 'මිරිස් රසැති පැණි රසය ඔවුන්ගේ දෑත් උණුසුම් කරද්දී, සුනිල් මෘදු සිනහවකින් තම වරද පිළිගත්තා.',
            words: [
              { cleanWord: 'as', displayWord: 'As' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'spicy', displayWord: 'spicy' },
              { cleanWord: 'sweetness', displayWord: 'sweetness' },
              { cleanWord: 'warmed', displayWord: 'warmed' },
              { cleanWord: 'their', displayWord: 'their' },
              { cleanWord: 'hands', displayWord: 'hands,' },
              { cleanWord: 'sunil', displayWord: 'Sunil' },
              { cleanWord: 'looked', displayWord: 'looked' },
              { cleanWord: 'up', displayWord: 'up' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'admitted', displayWord: 'admitted' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'mistake', displayWord: 'mistake' },
              { cleanWord: 'with', displayWord: 'with' },
              { cleanWord: 'a', displayWord: 'a' },
              { cleanWord: 'gentle', displayWord: 'gentle' },
              { cleanWord: 'smile', displayWord: 'smile.' }
            ]
          },
          {
            id: 'vp2-5',
            englishText: 'Rohan laughed and clasped his neighbor’s hand, and the sound of joyful laughter filled the village street once more.',
            sinhalaTranslation: 'රොහාන් සිනාසෙමින් තම අසල්වැසියාගේ අත අල්ලාගත් අතර, ප්‍රීතිමත් සිනහ හඬ නැවත වරක් ගම් වීදිය පුරා පැතිර ගියා.',
            words: [
              { cleanWord: 'rohan', displayWord: 'Rohan' },
              { cleanWord: 'laughed', displayWord: 'laughed' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'clasped', displayWord: 'clasped' },
              { cleanWord: 'his', displayWord: 'his' },
              { cleanWord: 'neighbors', displayWord: "neighbor's", vocab: { word: 'neighbors', phonetic: '/ˈneɪbəz/', sinhalaMeaning: 'අසල්වැසියන්', englishDefinition: 'People living near each other', partOfSpeech: 'noun' } },
              { cleanWord: 'hand', displayWord: 'hand,' },
              { cleanWord: 'and', displayWord: 'and' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'sound', displayWord: 'sound' },
              { cleanWord: 'of', displayWord: 'of' },
              { cleanWord: 'joyful', displayWord: 'joyful' },
              { cleanWord: 'laughter', displayWord: 'laughter,', vocab: { word: 'laughter', phonetic: '/ˈlɑːftə/', sinhalaMeaning: 'සිනහව', englishDefinition: 'The sound of amusement and joy', partOfSpeech: 'noun' } },
              { cleanWord: 'filled', displayWord: 'filled' },
              { cleanWord: 'the', displayWord: 'the' },
              { cleanWord: 'village', displayWord: 'village' },
              { cleanWord: 'street', displayWord: 'street' },
              { cleanWord: 'once', displayWord: 'once' },
              { cleanWord: 'more', displayWord: 'more.' }
            ]
          }
        ]
      }
    ]
  }
];


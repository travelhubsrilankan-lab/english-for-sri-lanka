import { Story, StoryCategory, StorySentence, VocabularyWord } from '../types/story';
import slFolktalesCover from '../assets/images/sl_folktales_cover_1794409847654.jpg';
import slVillageCover from '../assets/images/sl_village_cover_1794409848002.jpg';
import slNatureCover from '../assets/images/sl_nature_cover_1794409848441.jpg';
import slHeritageCover from '../assets/images/sl_heritage_cover_1794409848695.jpg';

import turtleMonkeyCover from '../assets/images/turtle_monkey_banana_cover_1794410400622.jpg';
import ctbBusCover from '../assets/images/ctb_bus_village_cover_1794410754765.jpg';
import yalaSumanaCover from '../assets/images/yala_sumana_elephant_cover_1794410753914.jpg';
import sigiriyaNimalCover from '../assets/images/sigiriya_nimal_treasure_cover_1794410755220.jpg';

import { ADDITIONAL_STORIES } from './additionalStories';

export const STORY_CATEGORIES: StoryCategory[] = [
  {
    id: 'folktales',
    titleEn: 'Folk Tales & Parables',
    titleSi: 'ජන කතා සහ උපමා කතා',
    shortLabelEn: 'Folk Tales',
    shortLabelSi: 'ජන කතා',
    descriptionSi: 'සාම්ප්‍රදායික ශ්‍රී ලාංකික ජන කතා සහ ජීවිතයට වටිනා ආදර්ශ ලබා දෙන උපමා කතා',
    coverImage: slFolktalesCover,
  },
  {
    id: 'village',
    titleEn: 'Village & Everyday Life',
    titleSi: 'ගැමි ජීවිතය සහ එදිනෙදා කතා',
    shortLabelEn: 'Village Life',
    shortLabelSi: 'ගැමි ජීවිතය',
    descriptionSi: 'අපේ ගම, රතු CTB බස් රථය, ගැමි එකමුතුව සහ සරල ජීවන අත්දැකීම් පිළිබඳ කතා',
    coverImage: slVillageCover,
  },
  {
    id: 'nature',
    titleEn: 'Sri Lankan Nature & Wildlife',
    titleSi: 'ලංකාවේ සොබාදහම සහ සතුන්',
    shortLabelEn: 'Nature & Wildlife',
    shortLabelSi: 'සොබාදහම',
    descriptionSi: 'සිංහරාජය, යාල වනෝද්‍යානය, අලි ඇතුන්, මොනරුන් සහ සුන්දර පරිසර කතා',
    coverImage: slNatureCover,
  },
  {
    id: 'heritage',
    titleEn: 'Heritage, History & Mystery',
    titleSi: 'උරුමය, ඉතිහාසය සහ අභිරහස්',
    shortLabelEn: 'Heritage & History',
    shortLabelSi: 'උරුමය හා ඉතිහාසය',
    descriptionSi: 'සීගිරිය, අනුරාධපුරය, ගාලු කොටුව, වීර කතා සහ කුතුහලය දනවන අබිරහස් කතා',
    coverImage: slHeritageCover,
  },
];

function createSentence(
  id: string,
  englishText: string,
  sinhalaTranslation: string,
  vocabMap: Record<string, VocabularyWord>
): StorySentence {
  const words = englishText.split(/\s+/).map((displayWord) => {
    const stripped = displayWord
      .replace(/^["'“”‘’([]+|[.,!?;:"'“”‘’)\]]+$/g, '')
      .replace(/[’']s$/i, '');
    const cleanWord = stripped.toLowerCase();
    const vocab = vocabMap[cleanWord];
    return {
      cleanWord,
      displayWord,
      ...(vocab ? { vocab } : {}),
    };
  });

  return {
    id,
    englishText,
    sinhalaTranslation,
    words,
  };
}

// ----------------------------------------------------------------------------
// VOCABULARY 1: The Clever Turtle and the Greedy Monkey (A1)
// ----------------------------------------------------------------------------
const TURTLE_MONKEY_VOCAB: Record<string, VocabularyWord> = {
  river: {
    word: 'river',
    phonetic: '/ˈrɪv.ər/',
    sinhalaMeaning: 'ගඟ',
    englishDefinition: 'A long line of fresh water flowing across the land.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  clever: {
    word: 'clever',
    phonetic: '/ˈklev.ər/',
    sinhalaMeaning: 'නුවණැති / දක්ෂ',
    englishDefinition: 'Smart and quick to think well.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  greedy: {
    word: 'greedy',
    phonetic: '/ˈɡriː.di/',
    sinhalaMeaning: 'කෑදර / ලෝභ',
    englishDefinition: 'Wanting more food or things than your fair share.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  floating: {
    word: 'floating',
    phonetic: '/ˈfləʊ.tɪŋ/',
    sinhalaMeaning: 'පාවෙමින් තිබෙන',
    englishDefinition: 'Staying on top of water without sinking.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  share: {
    word: 'share',
    phonetic: '/ʃeər/',
    sinhalaMeaning: 'බෙදා ගන්නවා',
    englishDefinition: 'To give part of something to someone else.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  roots: {
    word: 'roots',
    phonetic: '/ruːts/',
    sinhalaMeaning: 'මුල්',
    englishDefinition: 'The bottom part of a plant that grows under the ground.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  leaves: {
    word: 'leaves',
    phonetic: '/liːvz/',
    sinhalaMeaning: 'කොළ',
    englishDefinition: 'The flat green parts growing on a plant or tree.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  mud: {
    word: 'mud',
    phonetic: '/mʌd/',
    sinhalaMeaning: 'මඩ / තෙත් පස',
    englishDefinition: 'Soft, wet soil near water.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  patient: {
    word: 'patient',
    phonetic: '/ˈpeɪ.ʃənt/',
    sinhalaMeaning: 'ඉවසිලිවන්ත',
    englishDefinition: 'Able to wait calmly without getting upset.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  dried: {
    word: 'dried',
    phonetic: '/draɪd/',
    sinhalaMeaning: 'වියළී ගියා',
    englishDefinition: 'Lost all water and became dry.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  ripe: {
    word: 'ripe',
    phonetic: '/raɪp/',
    sinhalaMeaning: 'ඉදුණු',
    englishDefinition: 'Ready to eat and sweet.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  hungry: {
    word: 'hungry',
    phonetic: '/ˈhʌŋ.ɡri/',
    sinhalaMeaning: 'බඩගිනි',
    englishDefinition: 'Needing food to eat.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  kind: {
    word: 'kind',
    phonetic: '/kaɪnd/',
    sinhalaMeaning: 'කරුණාවන්ත',
    englishDefinition: 'Caring, warm, and helpful to others.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  feast: {
    word: 'feast',
    phonetic: '/fiːst/',
    sinhalaMeaning: 'රසවත් කෑම වේල / සංග්‍රහය',
    englishDefinition: 'A big, happy meal shared with friends.',
    partOfSpeech: 'noun',
    highlight: true,
  },
};

// ----------------------------------------------------------------------------
// VOCABULARY 2: The Happy Red Bus (A1)
// ----------------------------------------------------------------------------
const CTB_BUS_VOCAB: Record<string, VocabularyWord> = {
  village: {
    word: 'village',
    phonetic: '/ˈvɪl.ɪdʒ/',
    sinhalaMeaning: 'ගම',
    englishDefinition: 'A small town in the countryside.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  early: {
    word: 'early',
    phonetic: '/ˈɜː.li/',
    sinhalaMeaning: 'උදෙන්ම / කලින්',
    englishDefinition: 'Near the start of the morning.',
    partOfSpeech: 'adverb',
    highlight: true,
  },
  horn: {
    word: 'horn',
    phonetic: '/hɔːn/',
    sinhalaMeaning: 'නළාව (හෝන් එක)',
    englishDefinition: 'The part of a bus that makes a loud warning sound.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  basket: {
    word: 'basket',
    phonetic: '/ˈbɑː.skɪt/',
    sinhalaMeaning: 'කූඩය',
    englishDefinition: 'A woven container for carrying fruit or food.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  hill: {
    word: 'hill',
    phonetic: '/hɪl/',
    sinhalaMeaning: 'කන්ද',
    englishDefinition: 'High ground that goes up like a small mountain.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  smoke: {
    word: 'smoke',
    phonetic: '/sməʊk/',
    sinhalaMeaning: 'දුම',
    englishDefinition: 'Gray or white gas rising from a fire or hot engine.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  rain: {
    word: 'rain',
    phonetic: '/reɪn/',
    sinhalaMeaning: 'වැස්ස',
    englishDefinition: 'Drops of water falling from the clouds.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  joke: {
    word: 'joke',
    phonetic: '/dʒəʊk/',
    sinhalaMeaning: 'විහිළුව',
    englishDefinition: 'Something funny said to make people laugh.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  push: {
    word: 'push',
    phonetic: '/pʊʃ/',
    sinhalaMeaning: 'තල්ලු කරනවා',
    englishDefinition: 'To press hard against something to move it forward.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  team: {
    word: 'team',
    phonetic: '/tiːm/',
    sinhalaMeaning: 'කණ්ඩායම',
    englishDefinition: 'A group of people working together.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  roar: {
    word: 'roar',
    phonetic: '/rɔːr/',
    sinhalaMeaning: 'හයියෙන් ගොරවන හඬ',
    englishDefinition: 'A loud, deep engine sound.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  cheer: {
    word: 'cheer',
    phonetic: '/tʃɪər/',
    sinhalaMeaning: 'සතුටින් අත්පොළසන් දෙනවා / ජය ඝෝෂා',
    englishDefinition: 'A happy shout when something goes well.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  snacks: {
    word: 'snacks',
    phonetic: '/snæks/',
    sinhalaMeaning: 'කෙටි කෑම',
    englishDefinition: 'Small, tasty pieces of food eaten between meals.',
    partOfSpeech: 'noun',
    highlight: true,
  },
};

// ----------------------------------------------------------------------------
// VOCABULARY 3: The Gentle Giant of Yala (A1)
// ----------------------------------------------------------------------------
const YALA_SUMANA_VOCAB: Record<string, VocabularyWord> = {
  forest: {
    word: 'forest',
    phonetic: '/ˈfɒr.ɪst/',
    sinhalaMeaning: 'වනාන්තරය / කැලෑව',
    englishDefinition: 'A large area full of trees and wild animals.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  lake: {
    word: 'lake',
    phonetic: '/leɪk/',
    sinhalaMeaning: 'වැව / ජලාශය',
    englishDefinition: 'A large body of fresh water surrounded by land.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  giant: {
    word: 'giant',
    phonetic: '/ˈdʒaɪ.ənt/',
    sinhalaMeaning: 'යෝධයා / ඉතා විශාල',
    englishDefinition: 'Someone or something much bigger than usual.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  gentle: {
    word: 'gentle',
    phonetic: '/ˈdʒen.təl/',
    sinhalaMeaning: 'මෘදු / කරුණාවන්ත',
    englishDefinition: 'Soft, calm, and careful not to hurt anyone.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  grass: {
    word: 'grass',
    phonetic: '/ɡrɑːs/',
    sinhalaMeaning: 'තණකොළ',
    englishDefinition: 'Short green plants that cover the ground.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  fawn: {
    word: 'fawn',
    phonetic: '/fɔːn/',
    sinhalaMeaning: 'පුංචි මුව පැටවා',
    englishDefinition: 'A very young baby deer.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  stuck: {
    word: 'stuck',
    phonetic: '/stʌk/',
    sinhalaMeaning: 'හිරවෙලා',
    englishDefinition: 'Caught in one place and unable to move.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  scared: {
    word: 'scared',
    phonetic: '/skeəd/',
    sinhalaMeaning: 'බය වෙලා',
    englishDefinition: 'Feeling afraid of danger.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  calm: {
    word: 'calm',
    phonetic: '/kɑːm/',
    sinhalaMeaning: 'සන්සුන්',
    englishDefinition: 'Quiet and peaceful, without panic.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  trunk: {
    word: 'trunk',
    phonetic: '/trʌŋk/',
    sinhalaMeaning: 'ඇතාගේ සොඬය',
    englishDefinition: 'The long nose an elephant uses to lift and drink.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  lift: {
    word: 'lift',
    phonetic: '/lɪft/',
    sinhalaMeaning: 'ඔසවනවා',
    englishDefinition: 'To pick someone or something up carefully.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  safe: {
    word: 'safe',
    phonetic: '/seɪf/',
    sinhalaMeaning: 'ආරක්ෂිත',
    englishDefinition: 'Free from harm or danger.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  thankful: {
    word: 'thankful',
    phonetic: '/ˈθæŋk.fəl/',
    sinhalaMeaning: 'ස්තූතිවන්ත / කෘතඥ',
    englishDefinition: 'Feeling happy and grateful for help.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  protect: {
    word: 'protect',
    phonetic: '/prəˈtekt/',
    sinhalaMeaning: 'ආරක්ෂා කරනවා',
    englishDefinition: 'To keep someone safe from harm.',
    partOfSpeech: 'verb',
    highlight: true,
  },
};

// ----------------------------------------------------------------------------
// VOCABULARY 4: The Secret Treasure of Sigiriya (A2)
// ----------------------------------------------------------------------------
const SIGIRIYA_TREASURE_VOCAB: Record<string, VocabularyWord> = {
  rock: {
    word: 'rock',
    phonetic: '/rɒk/',
    sinhalaMeaning: 'පර්වතය / ගල',
    englishDefinition: 'A giant, solid stone mountain.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  palace: {
    word: 'palace',
    phonetic: '/ˈpæl.ɪs/',
    sinhalaMeaning: 'මාලිගාව',
    englishDefinition: 'A grand old home where a king or queen lived.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  treasure: {
    word: 'treasure',
    phonetic: '/ˈtreʒ.ər/',
    sinhalaMeaning: 'නිධානය / වටිනා දේ',
    englishDefinition: 'Something very valuable like gold, jewels, or wisdom.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  secret: {
    word: 'secret',
    phonetic: '/ˈsiː.krət/',
    sinhalaMeaning: 'රහස්',
    englishDefinition: 'Hidden away so most people do not know about it.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  climb: {
    word: 'climb',
    phonetic: '/klaɪm/',
    sinhalaMeaning: 'නඟිනවා',
    englishDefinition: 'To walk up steps or go higher up a hill.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  cave: {
    word: 'cave',
    phonetic: '/keɪv/',
    sinhalaMeaning: 'ගල් ගුහාව',
    englishDefinition: 'A natural hollow room inside stone or a rock.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  steps: {
    word: 'steps',
    phonetic: '/steps/',
    sinhalaMeaning: 'පියගැටපෙළ / පඩි',
    englishDefinition: 'Flat stones built one above another for walking up.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  wall: {
    word: 'wall',
    phonetic: '/wɔːl/',
    sinhalaMeaning: 'පවුර / බිත්තිය',
    englishDefinition: 'A tall stone or brick side built to protect or hold paint.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  pool: {
    word: 'pool',
    phonetic: '/puːl/',
    sinhalaMeaning: 'පොකුණ',
    englishDefinition: 'A small still area of clear water.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  paintings: {
    word: 'paintings',
    phonetic: '/ˈpeɪn.tɪŋz/',
    sinhalaMeaning: 'බිතුසිතුවම් / චිත්‍ර',
    englishDefinition: 'Colorful pictures made with brushes and paint.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  wise: {
    word: 'wise',
    phonetic: '/waɪz/',
    sinhalaMeaning: 'නුවණැති / බුද්ධිමත්',
    englishDefinition: 'Having deep understanding and good sense.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  beauty: {
    word: 'beauty',
    phonetic: '/ˈbjuː.ti/',
    sinhalaMeaning: 'සුන්දරත්වය',
    englishDefinition: 'Something wonderful to look at that makes you smile.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  history: {
    word: 'history',
    phonetic: '/ˈhɪs.tər.i/',
    sinhalaMeaning: 'ඉතිහාසය',
    englishDefinition: 'True stories from a long time ago.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  proud: {
    word: 'proud',
    phonetic: '/praʊd/',
    sinhalaMeaning: 'ආඩම්බර වූ',
    englishDefinition: 'Feeling happy and pleased about your home or work.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
};

export const STORIES: Story[] = [
  // --------------------------------------------------------------------------
  // 1. Folk Tales & Parables: The Clever Turtle and the Greedy Monkey
  // --------------------------------------------------------------------------
  {
    id: 'clever-turtle-greedy-monkey',
    categoryId: 'folktales',
    categoryTitleEn: '1. Folk Tales & Parables',
    categoryTitleSi: 'ජන කතා සහ උපමා කතා',
    titleEn: 'The Clever Turtle and the Greedy Monkey',
    titleSi: 'නුවණැති ඉබ්බා සහ කෑදර වඳුරා',
    level: 'Beginner (A1)',
    genreEn: 'Folk Tale & Parable',
    genreSi: 'ජන කතා සහ උපමා කතා',
    estimatedMinutes: 3,
    coverAccent: '#d97706',
    coverImage: turtleMonkeyCover,
    theme: 'nature',
    chapters: [
      {
        id: 'turtle-monkey-ch1',
        chapterNumber: 1,
        titleEn: 'A Surprise on the Water',
        titleSi: 'ගඟේ පාවී ආ පුදුමය',
        subtitleEn: 'Tiki and Bobo find a banana tree',
        subtitleSi: 'ටිකී සහ බොබෝට කෙසෙල් ගසක් හමුවීම',
        summaryEn: 'Best friends Tiki the turtle and Bobo the monkey pull a fallen banana tree out of the river.',
        summarySi: 'මිතුරන් වන ටිකී ඉබ්බා සහ බොබෝ වඳුරා ගඟේ පාවී ආ කෙසෙල් ගසක් ගොඩට ගනිති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'tm-1-1',
            'Beside a sunny river in Sri Lanka lived a clever little turtle named Tiki and a greedy monkey named Bobo.',
            'ලංකාවේ හිරු එළිය වැටුණු ගංගාවක් අසල, ටිකී නම් නුවණැති පුංචි ඉබ්බෙකුත් බොබෝ නම් කෑදර වඳුරෙකුත් ජීවත් වුණා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-1-2',
            'One bright morning, they saw a big green banana tree floating down the stream.',
            'එක් ලස්සන උදෑසනක, ගං දියේ පාවී එන ලොකු කොළ පැහැති කෙසෙල් ගසක් ඔවුන් දැක්කා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-1-3',
            '"Look, Tiki! Help me pull it to the sand!" cried Bobo with sparkling eyes.',
            '"බලන්න ටිකී! මේක වැල්ලට ඇදගන්න මට උදව් කරන්න!" කියා බොබෝ දිදුලන ඇස්වලින් කෑගැසුවා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-1-4',
            'They pulled together on the wet grass and decided to share the tree in two fair parts.',
            'දෙන්නාම එකතු වී ගස තෙත් තණපිටියට ඇදගෙන, එය කොටස් දෙකකට බෙදා ගන්න තීරණය කළා.',
            TURTLE_MONKEY_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_MONKEY_VOCAB.river,
          TURTLE_MONKEY_VOCAB.clever,
          TURTLE_MONKEY_VOCAB.greedy,
          TURTLE_MONKEY_VOCAB.floating,
          TURTLE_MONKEY_VOCAB.share,
        ],
        funFactEn: 'Short, friendly sentences help you read smoothly in English without stopping on every line.',
        funFactSi: 'කෙටි හා සරල වාක්‍ය මඟින් ඉංග්‍රීසි කතාවක් බාධාවකින් තොරව ගලා යන අයුරින් කියවීමට පහසු වේ.',
      },
      {
        id: 'turtle-monkey-ch2',
        chapterNumber: 2,
        titleEn: 'Top or Bottom?',
        titleSi: 'උඩ කොටසද? යට කොටසද?',
        subtitleEn: 'Bobo grabs the big green leaves',
        subtitleSi: 'බොබෝ කොළ පිරුණු උඩ කොටස තෝරා ගැනීම',
        summaryEn: 'Bobo grabs the leafy top half while Tiki calmly takes the brown roots and plants them in cool mud.',
        summarySi: 'බොබෝ උඩ කොළ කොටස උදුරා ගනිද්දී, ටිකී මුල් කොටස ගෙන තෙත් මඩ පසේ සිටුවයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'tm-2-1',
            'Bobo jumped fast and grabbed the top half with wide green leaves.',
            'බොබෝ ඉක්මනින් පැන, පළල් කොළ පැහැති පත්‍ර ඇති උඩ කොටස අල්ලා ගත්තා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-2-2',
            '"I want the tall half!" he laughed. "Bananas always grow up high, not in the dirt!"',
            '"මට ඕන උස කොටස! කෙසෙල් හැදෙන්නේ උඩ මිසක් පොළොව යට නෙවෙයි!" කියා ඔහු හිනාවුණා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-2-3',
            'Patient little Tiki smiled quietly and carried away the short bottom half with brown roots.',
            'ඉවසිලිවන්ත පුංචි ටිකී නිහඬව හිනාවෙලා, දුඹුරු මුල් තිබුණු පහළ කොටස අරගෙන ගියා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-2-4',
            'He dug a cozy hole in soft river mud, watered it each morning, and sang a gentle rain song.',
            'ඔහු ගඟ අසල මෘදු මඩ පසේ වළක් හාරා එය සිටුවා, හැම උදේකම වතුර දමමින් මිහිරි වැසි ගීතයක් මිමිණුවා.',
            TURTLE_MONKEY_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_MONKEY_VOCAB.leaves,
          TURTLE_MONKEY_VOCAB.patient,
          TURTLE_MONKEY_VOCAB.roots,
          TURTLE_MONKEY_VOCAB.mud,
        ],
        funFactEn: 'A banana plant only grows new shoots and fruit from its underground base and roots.',
        funFactSi: 'කෙසෙල් ගසක නව පැළ හා ගෙඩි හටගන්නේ පහළ මුල් සහ අලය මඟින් පමණි.',
      },
      {
        id: 'turtle-monkey-ch3',
        chapterNumber: 3,
        titleEn: 'Sun, Rain, and Time',
        titleSi: 'අව්ව, වැස්ස සහ කාලය',
        subtitleEn: 'Two very different trees after three months',
        subtitleSi: 'මාස තුනකට පසු දකින්න ලැබුණු වෙනස',
        summaryEn: 'Bobo’s leafless stick dries up in the sun, while Tiki’s plant grows heavy with sweet yellow bananas.',
        summarySi: 'බොබෝගේ කොටස අව්වට වියළී යද්දී, ටිකීගේ ගසේ රසවත් කහ කෙසෙල් කැන් පිරෙයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'tm-3-1',
            'Bobo pushed his leafy top into dry sand and spent every afternoon sleeping on a rock.',
            'බොබෝ තමාගේ කොළ කොටස වියළි වැල්ලේ ගසා, හැම හවසකම ගලක් උඩ නිදා ගත්තා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-3-2',
            'Soon the hot sun dried his green leaves until only a brown stick was left.',
            'ටික දවසකින් තද අව්වට ඒ කොළ වියළී ගොස්, ඉතිරි වුණේ වේළුණු කෝටුවක් විතරයි.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-3-3',
            'Meanwhile, Tiki’s tree grew tall and strong, holding two big bunches of sweet, ripe bananas.',
            'ඒ අතරතුර ටිකීගේ ගස උසටත් ශක්තිමත්වත් වැඩී, පැණි රස ඉදුණු කෙසෙල් කැන් දෙකකින් බර වුණා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-3-4',
            'Hungry Bobo sat nearby rubbing his empty tummy, too shy to look at his clever friend.',
            'බඩගින්නේ හිටපු බොබෝ හිස් බඩ අතගාමින් ළඟින්ම වාඩි වුණත්, නුවණැති මිතුරා දිහා බලන්න ලැජ්ජා වුණා.',
            TURTLE_MONKEY_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_MONKEY_VOCAB.dried,
          TURTLE_MONKEY_VOCAB.ripe,
          TURTLE_MONKEY_VOCAB.hungry,
        ],
        funFactEn: 'Notice the word "tummy" — it is a warm, friendly everyday word for stomach used in stories!',
        funFactSi: '"Tummy" යනු බඩ හැඳින්වීමට කතාවල සහ එදිනෙදා ඉංග්‍රීසි භාෂාවේ යොදාගන්නා ආදරණීය වචනයකි.',
      },
      {
        id: 'turtle-monkey-ch4',
        chapterNumber: 4,
        titleEn: 'A Sweet Banana Feast',
        titleSi: 'මිහිරි කෙසෙල් සංග්‍රහය',
        subtitleEn: 'A true friend always shares',
        subtitleSi: 'සැබෑ මිතුරෙකුගේ කරුණාව',
        summaryEn: 'Kind Tiki invites Bobo to share the bananas, teaching him that patience and care taste sweeter than greed.',
        summarySi: 'කරුණාවන්ත ටිකී බොබෝටත් කෙසෙල් බෙදා දී ඉවසීමේ සහ මිතුදමේ වටිනාකම කියා දෙයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'tm-4-1',
            'Kind Tiki saw Bobo’s sad eyes and called out, "Come down, Bobo! Let us eat together!"',
            'බොබෝගේ දුක්බර ඇස් දැකපු කරුණාවන්ත ටිකී, "එන්න බොබෝ! අපි දෙන්නාම එකට කමු!" කියා කතා කළා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-4-2',
            'He cut down the golden bunch and laid out a happy river feast on wide lotus leaves.',
            'ඔහු රන්වන් කෙසෙල් කැන කපා, පළල් නෙළුම් කොළ මත ගඟ අද්දර රසවත් සංග්‍රහයක් සූදානම් කළා.',
            TURTLE_MONKEY_VOCAB
          ),
          createSentence(
            'tm-4-3',
            '"Sorry for being greedy, Tiki," whispered Bobo as he tasted a sweet banana. "Wait a little, care a little—that is how good things grow!"',
            '"කෑදර වුණාට මට සමාවෙන්න ටිකී," කියා මිහිරි කෙසෙල් ගෙඩියක රස බලමින් බොබෝ හෙමින් කීවා. "ටිකක් ඉවසලා ආදරෙන් බලාගත්තමයි හැම හොඳ දෙයක්ම හැදෙන්නේ!"',
            TURTLE_MONKEY_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_MONKEY_VOCAB.kind,
          TURTLE_MONKEY_VOCAB.feast,
        ],
        funFactEn: 'In Sri Lankan villages, fresh meals served on lotus or banana leaves smell wonderful and keep food clean.',
        funFactSi: 'නෙළුම් කොළේ හෝ කෙසෙල් කොළේ කෑම බෙදා ගැනීම ගැමි රසයත් සුවඳත් දෙගුණ කරයි.',
      },
    ],
    quiz: [
      {
        id: 'tm-q1',
        questionEn: 'What did Tiki and Bobo find floating in the river?',
        questionSi: 'ටිකී සහ බොබෝ ගඟේ පාවෙමින් තිබෙනු දුටුවේ කුමක්ද?',
        options: [
          'A wooden boat',
          'A big green banana tree',
          'A basket of mangoes',
          'A yellow umbrella',
        ],
        optionsSi: [
          'ලී ඔරුවක්',
          'ලොකු කොළ පැහැති කෙසෙල් ගසක්',
          'අඹ කූඩයක්',
          'කහ කුඩයක්',
        ],
        correctIndex: 1,
        explanationSi: 'ඔවුන් දෙදෙනා ගං දියේ පාවී එන ලොකු කෙසෙල් ගසක් දුටුවෝය.',
      },
      {
        id: 'tm-q2',
        questionEn: 'Why did Bobo pick the top half of the tree?',
        questionSi: 'බොබෝ ගසේ උඩ කොටස තෝරා ගත්තේ ඇයි?',
        options: [
          'He wanted to help Tiki carry less',
          'He thought bananas grow high up where the leaves are',
          'The roots looked too scary',
          'He wanted to make a toy boat',
        ],
        optionsSi: [
          'ටිකීට උදව් කිරීමට',
          'කෙසෙල් හැදෙන්නේ කොළ තියෙන උඩ කොටසේ යැයි සිතූ නිසා',
          'මුල් දැකීමට බිය වූ නිසා',
          'සෙල්ලම් බෝට්ටුවක් සෑදීමට',
        ],
        correctIndex: 1,
        explanationSi: 'කෙසෙල් හැදෙන්නේ උඩ කොටසේ කියා සිතූ බොබෝ ඉක්මනින් එය ගත්තේය.',
      },
      {
        id: 'tm-q3',
        questionEn: 'What happened to Bobo’s half in the dry sand?',
        questionSi: 'වියළි වැල්ලේ සිටවූ බොබෝගේ කොටසට කුමක් වුණාද?',
        options: [
          'It grew twenty bananas',
          'The hot sun dried it into a brown stick',
          'It turned into a mango tree',
          'Birds built a nest in it',
        ],
        optionsSi: [
          'එහි කෙසෙල් විස්සක් හැදුණා',
          'තද අව්වට වියළී ගොස් කෝටුවක් වුණා',
          'එය අඹ ගසක් වුණා',
          'කුරුල්ලන් කූඩුවක් සෑදුවා',
        ],
        correctIndex: 1,
        explanationSi: 'මුල් නැති නිසාත් සාත්තු නොකළ නිසාත් බොබෝගේ කොටස අව්වට වියළී ගියේය.',
      },
      {
        id: 'tm-q4',
        questionEn: 'How did Tiki treat Bobo at the end?',
        questionSi: 'අවසානයේදී ටිකී බොබෝට කෙසේ සැලකුවේද?',
        options: [
          'He hid the bananas behind a bush',
          'He shouted at Bobo to go away',
          'He happily invited Bobo to share a sweet banana feast',
          'He sold every banana at the market',
        ],
        optionsSi: [
          'පඳුරක් පිටුපස කෙසෙල් සැඟවුවා',
          'යන්න කියා බැන්නා',
          'ආදරයෙන් කතා කර කෙසෙල් සංග්‍රහය බෙදා ගත්තා',
          'පොළේදී සියල්ල විකුණා දැමුවා',
        ],
        correctIndex: 2,
        explanationSi: 'කරුණාවන්ත ටිකී නෙළුම් කොළ මත කෙසෙල් තබා තම මිතුරා සමඟ සතුටින් බෙදා ගත්තේය.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. Village & Everyday Life: The Happy Red Bus
  // --------------------------------------------------------------------------
  {
    id: 'crazy-ctb-bus-adventure',
    categoryId: 'village',
    categoryTitleEn: '2. Village & Everyday Life',
    categoryTitleSi: 'ගැමි ජීවිතය සහ එදිනෙදා කතා',
    titleEn: 'The Happy Red Bus',
    titleSi: 'හිනාව පිරුණු රතු බස් ගමන',
    level: 'Beginner (A1)',
    genreEn: 'Village & Everyday Life',
    genreSi: 'ගැමි ජීවිතය සහ එදිනෙදා කතා',
    estimatedMinutes: 3,
    coverAccent: '#b91c1c',
    coverImage: ctbBusCover,
    theme: 'community',
    chapters: [
      {
        id: 'ctb-bus-ch1',
        chapterNumber: 1,
        titleEn: 'Six O’Clock Horn',
        titleSi: 'උදේ හයේ හෝන් හඬ',
        subtitleEn: 'Our red bus wakes up the village',
        subtitleSi: 'මුළු ගමම අවදි කරන රතු බසය',
        summaryEn: 'Early every morning, Driver Sena brings his bright red bus through paddy fields, picking up smiling villagers.',
        summarySi: 'හැම උදේකම සේන මාමා රතු බස් රථයෙන් වෙල් යාය මැදින් ඇවිත් ගමේ හැමෝම එක්ක යයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ctb-1-1',
            'Early every morning at six, the bright red village bus rolls down the lane with a cheerful "Beep-beep!" horn.',
            'හැම උදේකම හයට, ප්‍රීතිමත් "බීප්-බීප්!" නළා හඬක් එක්ක දීප්තිමත් රතු ගමේ බස් රථය පාර දිගේ එනවා.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-1-2',
            'Driver Sena waves to everyone from his seat and waits when sleepy school kids come running with crooked ties.',
            'සේන රියදුරු මාමා හැමෝටම අත වනලා, නිදිමතේ ඇද වුණු ටයි පටි දාගෙන දුවගෙන එන පාසල් ළමයි එනකල් ඉවසිල්ලෙන් නවත්වනවා.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-1-3',
            'Inside, aunties hold a basket of fresh vegetables, while old grandpas read the morning paper aloud.',
            'බසය ඇතුළේ නැන්දලා නැවුම් එළවළු කූඩයක් අල්ලාගෙන ඉන්න අතරේ, සීයලා උදේ පත්තරේ හයියෙන් කියවනවා.',
            CTB_BUS_VOCAB
          ),
        ],
        keyVocabulary: [
          CTB_BUS_VOCAB.early,
          CTB_BUS_VOCAB.village,
          CTB_BUS_VOCAB.horn,
          CTB_BUS_VOCAB.basket,
        ],
        funFactEn: 'In Sri Lanka, early morning red CTB buses feel like a moving living room where everyone knows your name!',
        funFactSi: 'ලංකාවේ ගම්මානවල උදේ රතු ලංගම බසය හැමෝම එකිනෙකා දන්නා සුහද පවුලක් වගෙයි.',
      },
      {
        id: 'ctb-bus-ch2',
        chapterNumber: 2,
        titleEn: 'Clunk on Temple Hill',
        titleSi: 'පන්සල් කන්දේදී ආ සද්දේ',
        subtitleEn: 'White smoke in the soft rain',
        subtitleSi: 'මල් වැස්ස මැද බසය නතර වීම',
        summaryEn: 'Halfway up the muddy temple hill, the old engine coughs white smoke and stops, yet nobody gets angry.',
        summarySi: 'පන්සල් කන්ද මැදදී බසය සුදු දුමක් දමා නතර වුණත්, කිසිවෙක් කේන්ති ගන්නේ නැත.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ctb-2-1',
            'One soft rainy Tuesday, as the bus climbed up the muddy temple hill, the engine went "Clunk! Cough!" and stopped.',
            'මල් වැස්ස වැටුණු එක අඟහරුවාදා දවසක, මඩ සහිත පන්සල් කන්ද නඟිද්දී එන්ජිම "ක්ලන්ක්!" ගාලා සද්දයක් දාලා නතර වුණා.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-2-2',
            'Puffs of gray smoke drifted out into the cool morning rain.',
            'අළු පාට දුම් රොටු සිසිල් උදෑසන වැස්සට මුසු වෙලා ඉහළට ගියා.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-2-3',
            'Driver Sena scratched his head and sighed, "Oh dear, our red lady needs a little rest today."',
            'සේන මාමා ඔළුව කසලා හෙමින් කීවා, "අනේ අපේ රතු කුමාරිට අද පොඩි විවේකයක් ඕන වෙලා වගේ."',
            CTB_BUS_VOCAB
          ),
        ],
        keyVocabulary: [
          CTB_BUS_VOCAB.rain,
          CTB_BUS_VOCAB.hill,
          CTB_BUS_VOCAB.smoke,
        ],
        funFactEn: 'Notice how calling an old red bus "our red lady" adds warmth and fun to English storytelling.',
        funFactSi: 'බස් රථයට ආදරෙන් "our red lady" කියා හැඳින්වීම කතාවට හරිම රසවත් ගැමි හුරුවක් ගෙන දෙයි.',
      },
      {
        id: 'ctb-bus-ch3',
        chapterNumber: 3,
        titleEn: 'One Big Village Push',
        titleSi: 'ගමේම එකමුතු තල්ලුව',
        subtitleEn: 'Conductor Pala starts a funny game',
        subtitleSi: 'පාල මාමාගේ විනෝදජනක ව්‍යායාමය',
        summaryEn: 'Conductor Pala cracks a joke, and students, shopkeepers, and grandpas push together to start the bus.',
        summarySi: 'පාල මාමාගේ විහිළුවත් එක්ක හැමෝම එක කණ්ඩායමක් වගේ එකතු වී බසය තල්ලු කර පණ ගන්වති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ctb-3-1',
            'Conductor Uncle Pala clapped his hands and made a funny joke: "Free morning gym for everyone! Step outside!"',
            'කොන්දොස්තර පාල මාමා අත්පුඩි ගහලා රසවත් විහිළුවක් කළා: "හැමෝටම නොමිලේ උදේ ව්‍යායාම! එන්න එළියට!"',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-3-2',
            'Schoolboys tucked up their white shorts, shop uncles rolled up their sleeves, and even Grandpa Banda joined the team.',
            'පාසල් කොල්ලෝ සුදු කලිසම් නවාගත්තා, කඩේ මාමලා අත් දිග කමිස අත් උඩට නැව්වා, බණ්ඩා සීයත් කණ්ඩායමට එකතු වුණා.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-3-3',
            '"One, two, three! Push!" they shouted together, slipping in soft puddles and laughing out loud.',
            '"එකයි, දෙකයි, තුනයි—තල්ලු කරන්න!" කියා හැමෝම එකට කෑගැහුවේ වතුර වළවල්වල ලිස්සමින් හයියෙන් හිනාවෙවී.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-3-4',
            'At last, the old engine gave a giant roar and rattled happily back to life!',
            'අන්තිමේදී පරණ එන්ජිම මහා හඬින් ගොරවලා ආයෙත් පණ ගැන්වුණා!',
            CTB_BUS_VOCAB
          ),
        ],
        keyVocabulary: [
          CTB_BUS_VOCAB.joke,
          CTB_BUS_VOCAB.team,
          CTB_BUS_VOCAB.push,
          CTB_BUS_VOCAB.roar,
        ],
        funFactEn: 'Short action words like "clapped", "slipped", and "rattled" make a story feel alive!',
        funFactSi: '"Clapped", "slipped", "rattled" වැනි කෙටි ක්‍රියා පද කතාවකට ජීවමාන ගතියක් එක් කරයි.',
      },
      {
        id: 'ctb-bus-ch4',
        chapterNumber: 4,
        titleEn: 'Hot Tea & Sweet Buns',
        titleSi: 'උණු තේ සහ රස බනිස්',
        subtitleEn: 'Turning a delay into a party',
        subtitleSi: 'ප්‍රමාදයත් සතුටු සාදයක් වුණු හැටි',
        summaryEn: 'Everyone climbs back in cheering, while Auntie Mala shares warm sugar buns and hot tea down the road.',
        summarySi: 'හැමෝම ජය ඝෝෂා නඟමින් බසයට ගොඩ වූ පසු මාලා නැන්දා උණු බනිස් සහ තේ බෙදා දෙයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ctb-4-1',
            'Muddy shoes and smiling faces climbed back onto the bus as everyone began to cheer.',
            'මඩ ගෑවුණු සපත්තු එක්ක සිනහමුසු මුහුණු ආයෙත් බසයට නැග්ගේ හැමෝම ජය ඝෝෂා නඟමින්.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-4-2',
            'Sweet Auntie Mala opened her warm cloth bag and passed soft sugar snacks and flasks of hot plain tea.',
            'ආදරණීය මාලා නැන්දා තම උණුසුම් රෙදි මල්ල ඇරලා, මෘදු සීනි බනිස් කෙටි කෑම සහ උණු ප්ලේන් ටී හැමෝටම බෙදුවා.',
            CTB_BUS_VOCAB
          ),
          createSentence(
            'ctb-4-3',
            'That rainy morning, nobody minded arriving ten minutes late—because pushing together made the whole village feel like one big family.',
            'එදා වැසි දවසේ විනාඩි දහයක් පරක්කු වුණාට කාටවත් දුකක් දැනුණේ නැහැ—මොකද එකට තල්ලු කළ ඒ මොහොත මුළු ගමම එකම පවුලක් කළ නිසයි.',
            CTB_BUS_VOCAB
          ),
        ],
        keyVocabulary: [
          CTB_BUS_VOCAB.cheer,
          CTB_BUS_VOCAB.snacks,
        ],
        funFactEn: 'Plain tea from a flask and warm buns on a rainy bus ride is a classic Sri Lankan comfort moment.',
        funFactSi: 'වැසි දවසක බස් ගමනකදී ප්ලේන් ටී එකක් එක්ක බනිස් ගෙඩියක් බෙදා ගැනීම හරිම සුන්දර අත්දැකීමකි.',
      },
    ],
    quiz: [
      {
        id: 'ctb-q1',
        questionEn: 'What does Driver Sena do when sleepy school kids come running?',
        questionSi: 'නිදිමතේ පාසල් ළමුන් දුවගෙන එන විට සේන මාමා කරන්නේ කුමක්ද?',
        options: [
          'He drives away fast',
          'He waits patiently with a friendly wave',
          'He honks angrily at them',
          'He closes the bus door early',
        ],
        optionsSi: [
          'වේගයෙන් බසය පදවාගෙන යනවා',
          'හිනාවෙලා අත වනා ඔවුන් එනකල් නවත්වනවා',
          'කේන්තියෙන් නළාව ගහනවා',
          'වේලාසනින් දොර වහනවා',
        ],
        correctIndex: 1,
        explanationSi: 'සේන මාමා හැමෝටම අත වනමින් ළමුන් එනතුරු බසය නවත්වාගෙන සිටී.',
      },
      {
        id: 'ctb-q2',
        questionEn: 'Where did the bus stop on that rainy Tuesday?',
        questionSi: 'වැසි අඟහරුවාදා දින බසය නතර වුණේ කොතැනද?',
        options: [
          'Inside a city garage',
          'Beside the beach',
          'Halfway up the muddy temple hill',
          'At the train station',
        ],
        optionsSi: [
          'නගරයේ ගරාජයක් ඇතුළේ',
          'මුහුදු වෙරළ අසල',
          'මඩ සහිත පන්සල් කන්ද මැද',
          'දුම්රිය ස්ථානයේ',
        ],
        correctIndex: 2,
        explanationSi: 'මඩ සහිත පන්සල් කන්ද නඟිමින් සිටියදී බසය සුදු දුමක් සමඟ නතර වුණි.',
      },
      {
        id: 'ctb-q3',
        questionEn: 'How did Conductor Pala make everyone smile during the stop?',
        questionSi: 'පාල මාමා සියලු දෙනා සිනාසෙව්වේ කෙසේද?',
        options: [
          'He joked about "free morning gym" and asked everyone to push together',
          'He told everyone to walk ten miles home',
          'He danced on the roof of the bus',
          'He hid under a seat',
        ],
        optionsSi: [
          '"නොමිලේ උදේ ව්‍යායාම!" කියා විහිළු කරමින් හැමෝටම එකට තල්ලු කරන්න කීවා',
          'හැමෝටම පයින් ගෙදර යන්න කීවා',
          'බසයේ වහලය උඩ නැටුවා',
          'ආසනයක් යට සැඟවුණා',
        ],
        correctIndex: 0,
        explanationSi: 'පාල මාමා විනෝදයෙන් විහිළු කර හැමෝම එක කණ්ඩායමක් ලෙස බසය තල්ලු කිරීමට එක් කළේය.',
      },
      {
        id: 'ctb-q4',
        questionEn: 'What did Auntie Mala share once the bus started moving again?',
        questionSi: 'බසය නැවත පණ ගැන්වූ පසු මාලා නැන්දා බෙදා දුන්නේ කුමක්ද?',
        options: [
          'Cold ice cream',
          'Fresh garden flowers',
          'Soft sugar snacks and hot plain tea',
          'Umbrellas and raincoats',
        ],
        optionsSi: [
          'අයිස්ක්‍රීම්',
          'නැවුම් මල්',
          'මෘදු සීනි බනිස් කෙටි කෑම සහ උණු ප්ලේන් ටී',
          'කුඩ සහ වැසි කබා',
        ],
        correctIndex: 2,
        explanationSi: 'සතුටින් බසයට ගොඩ වූ සැමට මාලා නැන්දා සීනි බනිස් සහ උණුසුම් ප්ලේන් ටී බෙදා දුන්නාය.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 3. Sri Lankan Nature & Wildlife: The Gentle Giant of Yala
  // --------------------------------------------------------------------------
  {
    id: 'giant-with-gentle-heart',
    categoryId: 'nature',
    categoryTitleEn: '3. Sri Lankan Nature & Wildlife',
    categoryTitleSi: 'ලංකාවේ සොබාදහම සහ සතුන්',
    titleEn: 'The Gentle Giant of Yala',
    titleSi: 'යාල වනයේ කරුණාවන්ත යෝධයා',
    level: 'Beginner (A1)',
    genreEn: 'Nature & Wildlife',
    genreSi: 'ලංකාවේ සොබාදහම සහ සතුන්',
    estimatedMinutes: 3,
    coverAccent: '#0f766e',
    coverImage: yalaSumanaCover,
    theme: 'nature',
    chapters: [
      {
        id: 'yala-sumana-ch1',
        chapterNumber: 1,
        titleEn: 'Sumana by the Lake',
        titleSi: 'වැව් ඉවුරේ සුමන',
        subtitleEn: 'Big tusks, soft heart',
        subtitleSi: 'විශාල දළ ඇති මෘදු හදවතක්',
        summaryEn: 'In Yala forest, huge elephant Sumana walks peacefully by the blue lake while little white birds ride on his back.',
        summarySi: 'යාල වනයේ වැව් තාවුල්ලේ ජීවත් වන සුමන ඇතාගේ පිට උඩ පුංචි සුදු කොක්කු පවා බිය නැතිව වාඩි වෙති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ys-1-1',
            'Deep inside the green forest of Yala lived Sumana, a tall gray elephant with two shiny curved tusks.',
            'යාල කොළ පැහැති වනාන්තරය ඇතුළේ, දිදුලන වක්‍ර දළ දෙකක් ඇති සුමන නම් උස අළු පැහැති ඇතෙක් ජීවත් වුණා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-1-2',
            'He loved walking beside the blue lake every morning to eat fresh green grass.',
            'ඔහු හැම උදේකම නැවුම් නිල් තණකොළ කන්න නිල්වන් වැව අද්දර ඇවිදින්න හරිම ආස කළා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-1-3',
            'Even though Sumana looked like a forest giant, little white birds happily rode on his back because he was so gentle.',
            'සුමන වනයේ යෝධයෙක් වගේ පෙනුණත්, ඔහු හරිම මෘදු කෙනෙක් නිසා පුංචි සුදු කුරුල්ලෝ පවා සතුටින් ඔහුගේ පිට උඩ ඉඳගෙන ගියා.',
            YALA_SUMANA_VOCAB
          ),
        ],
        keyVocabulary: [
          YALA_SUMANA_VOCAB.forest,
          YALA_SUMANA_VOCAB.lake,
          YALA_SUMANA_VOCAB.grass,
          YALA_SUMANA_VOCAB.giant,
          YALA_SUMANA_VOCAB.gentle,
        ],
        funFactEn: 'Wild white egrets often sit on elephants and buffaloes in Yala to catch insects in the grass!',
        funFactSi: 'යාල වනයේ සුදු කොක්කු අලි ඇතුන්ගේ පිට උඩ හිඳගෙන තණකොළ අතර සිටින කෘමීන් අල්ලා ගනිති.',
      },
      {
        id: 'yala-sumana-ch2',
        chapterNumber: 2,
        titleEn: 'Stuck in the Mud',
        titleSi: 'මඩ වළේ හිරවුණු පැටියා',
        subtitleEn: 'A baby deer slips at noon',
        subtitleSi: 'මද්දහනේ දිය වළ අසල සිදුවූ අනතුර',
        summaryEn: 'At noon, a playful spotted fawn slips into a sticky mud pit while his worried mother calls for help.',
        summarySi: 'දහවල් සෙල්ලම් කරමින් සිටි පුංචි මුව පැටවෙකු ඇලෙන මඩ වළකට ලිස්සා වැටී හිරවෙයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ys-2-1',
            'One hot sunny noon, a playful spotted fawn chased a bright butterfly too close to an old mud hole.',
            'උණුසුම් හිරු පායපු එක් මද්දහනක, දඟකාර තිත් මුව පැටියෙක් ලස්සන සමනලයෙක් පස්සේ දුවගෙන ගිහින් පරණ මඩ වළක් ළඟටම ආවා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-2-2',
            'Splash! His thin little legs slipped right down and got stuck deep in sticky brown mud.',
            'ජබොක්! උගේ සිහින් පුංචි කකුල් ලිස්සලා ගිහින් ඇලෙන දුඹුරු මඩේ ගැඹුරටම හිරවුණා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-2-3',
            'The scared fawn cried "Eeeek!", while his mother ran in circles, far too small to pull him free.',
            'බය වුණු මුව පැටියා "ඊක්!" ගාලා ඇඬුවා; අම්මා මුවදෙන වටේට දුවමින් උත්සාහ කළත්, ඇය පැටියා ඇදගන්න හරිම පුංචි වැඩි වුණා.',
            YALA_SUMANA_VOCAB
          ),
        ],
        keyVocabulary: [
          YALA_SUMANA_VOCAB.fawn,
          YALA_SUMANA_VOCAB.stuck,
          YALA_SUMANA_VOCAB.scared,
        ],
        funFactEn: 'A baby deer is called a "fawn" in English, and its white spots help hide it in sunny tree shadows.',
        funFactSi: 'මුව පැටවෙකුට ඉංග්‍රීසියෙන් "Fawn" කියා කියයි; උගේ ඇඟේ තිත් වනාන්තර සෙවණැලි අතර සැඟවී සිටීමට උදව් වේ.',
      },
      {
        id: 'yala-sumana-ch3',
        chapterNumber: 3,
        titleEn: 'A Soft Lift',
        titleSi: 'සොඬයෙන් දුන් ආදරණීය උදව්ව',
        subtitleEn: 'Careful help from a calm friend',
        subtitleSi: 'කිසිදු හානියක් නොවී ගොඩට එසවීම',
        summaryEn: 'Sumana hears the cry, stays calm, kneels softly, and lifts the fawn out onto dry green leaves.',
        summarySi: 'හැඬුම ඇසුණු සුමන සන්සුන්ව පැමිණ දණ ගසා මුව පැටවා පරිස්සමින් ගොඩට ඔසවයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ys-3-1',
            'Behind a palm bush, Sumana stopped chewing and listened carefully to the worried cries.',
            'තල් පඳුරක් පිටුපසින් හිටපු සුමන කෑම කන එක නවත්තලා ඒ දුක්බර හැඬුම් හඬට හොඳින් ඇහුම්කන් දුන්නා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-3-2',
            'Calm and steady, the big elephant walked over and knelt slowly in the tall grass.',
            'හරිම සන්සුන්ව එතැනට ආපු ලොකු ඇතා උස තණකොළ මැද හෙමින් දණ ගැහුවා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-3-3',
            'He slid his strong gray trunk softly under the fawn’s tummy, careful not to hurt its thin legs, and gave one smooth lift onto safe dry leaves!',
            'මුව පැටියාගේ සිහින් කකුල්වලට රිදෙන්නේ නැති විදිහට ඔහු තම ශක්තිමත් සොඬය උගේ බඩ යටින් මෘදුව තබලා, ආරක්ෂිත වියළි කොළ ගොඩ උඩට හෙමින් ඔසවා තැබුවා!',
            YALA_SUMANA_VOCAB
          ),
        ],
        keyVocabulary: [
          YALA_SUMANA_VOCAB.calm,
          YALA_SUMANA_VOCAB.trunk,
          YALA_SUMANA_VOCAB.lift,
          YALA_SUMANA_VOCAB.safe,
        ],
        funFactEn: 'An elephant’s trunk can pick up a heavy tree log or lift one tiny grape without squishing it!',
        funFactSi: 'අලියෙකුගේ සොඬයට බර කොටයක් ඔසවන්න පුළුවන් වගේම, කුඩා මිදි ගෙඩියක් තැළෙන්නේ නැතුව ගන්නත් පුළුවන්.',
      },
      {
        id: 'yala-sumana-ch4',
        chapterNumber: 4,
        titleEn: 'A Happy Water Shower',
        titleSi: 'සතුටු වතුර මල',
        subtitleEn: 'True strength protects smaller friends',
        subtitleSi: 'සැබෑ ශක්තිය නම් පුංචි අය රැකගැනීමයි',
        summaryEn: 'The thankful mother deer touches Sumana’s trunk softly, and Sumana sprays a joyful shower of cool water.',
        summarySi: 'මව් මුවදෙන ආදරයෙන් ස්තුති කරන අතර, සුමන සතුටින් අහසට සිසිල් දිය විහිදුවයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'ys-4-1',
            'The thankful mother deer gently touched Sumana’s big trunk with her nose before leaping into the trees with her clean baby.',
            'කෘතඥ වුණු මව් මුවදෙන තම නහයෙන් සුමනගේ ලොකු සොඬය මෘදුව ස්පර්ශ කරලා, පිරිසිදු වුණු පැටියත් එක්ක ගස් අතරට පැනලා ගියා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-4-2',
            'Sumana flapped his wide ears and sprayed a happy sparkling shower of cool lake water into the blue sky.',
            'සුමන තම පළල් කන් සලමින්, සිසිල් වැව් වතුර රන්වන් හිරු එළියේ දිදුලන මලක් වගේ නිල් අහසට විද්දා.',
            YALA_SUMANA_VOCAB
          ),
          createSentence(
            'ys-4-3',
            'Every creature by the water knew his secret: true strength is using big power to protect small friends.',
            'වැව් ඉවුරේ හිටපු හැම සතෙක්ම ඔහුගේ රහස දැන සිටියා: සැබෑ ශක්තිය කියන්නේ තමන්ගේ ලොකු බලයෙන් පුංචි මිතුරන් ආරක්ෂා කිරීමයි.',
            YALA_SUMANA_VOCAB
          ),
        ],
        keyVocabulary: [
          YALA_SUMANA_VOCAB.thankful,
          YALA_SUMANA_VOCAB.protect,
        ],
        funFactEn: 'Elephants often trumpet or flap their ears gently when they feel happy and relaxed.',
        funFactSi: 'අලි ඇතුන් සතුටින් හා සැහැල්ලුවෙන් සිටින විට කන් සලමින් සතුට පළ කරති.',
      },
    ],
    quiz: [
      {
        id: 'ys-q1',
        questionEn: 'Why did little white birds love riding on Sumana’s back?',
        questionSi: 'පුංචි සුදු කුරුල්ලන් සුමනගේ පිට උඩ ඉඳගෙන යන්න කැමති වුණේ ඇයි?',
        options: [
          'Because he carried fish in his ears',
          'Because he was calm and gentle',
          'Because he could fly over trees',
          'Because he gave them bananas',
        ],
        optionsSi: [
          'ඔහු කන්වල මාළු ගෙන ගිය නිසා',
          'ඔහු හරිම සන්සුන් හා මෘදු නිසා',
          'ඔහුට ගස් උඩින් පියාඹන්න පුළුවන් නිසා',
          'ඔහු කෙසෙල් දුන් නිසා',
        ],
        correctIndex: 1,
        explanationSi: 'සුමන යෝධයෙකු මෙන් පෙනුණද ඉතා මෘදු ගතිගුණ ඇති බැවින් කුරුල්ලෝ බිය නැතිව ඔහුගේ පිට මත හිඳිති.',
      },
      {
        id: 'ys-q2',
        questionEn: 'How did the baby deer get stuck in the mud hole?',
        questionSi: 'මුව පැටියා මඩ වළේ හිරවුණේ කොහොමද?',
        options: [
          'He chased a bright butterfly too close to the mud',
          'He jumped off a tall cliff',
          'Sumana pushed him by mistake',
          'He was looking for a ball',
        ],
        optionsSi: [
          'සමනලයෙක් පස්සේ දුවගෙන ගිහින් මඩ වළට ලිස්සා වැටුණු නිසා',
          'උස ගලකින් පැන්න නිසා',
          'සුමන වැරදීමකින් තල්ලු කළ නිසා',
          'බෝලයක් හෙවූ නිසා',
        ],
        correctIndex: 0,
        explanationSi: 'ලස්සන සමනලයෙකු පසුපස දුවමින් සිටි පැටියා පරණ මඩ වළට ලිස්සා වැටුණි.',
      },
      {
        id: 'ys-q3',
        questionEn: 'How did Sumana lift the fawn safely?',
        questionSi: 'සුමන මුව පැටවා පරිස්සමින් ඔසවා ගත්තේ කෙසේද?',
        options: [
          'He grabbed its tail with his teeth',
          'He knelt down and slid his trunk softly under the fawn’s tummy',
          'He rolled a big rock into the mud',
          'He called five other elephants',
        ],
        optionsSi: [
          'දත්වලින් වලිගයෙන් ඇද්දා',
          'දණ ගසා සොඬය පැටියාගේ බඩ යටින් මෘදුව තබා එසවූවා',
          'විශාල ගලක් මඩට තල්ලු කළා',
          'තවත් අලි පස්දෙනෙකුට කතා කළා',
        ],
        correctIndex: 1,
        explanationSi: 'සිහින් පාදවලට හානි නොවන සේ සොඬය බඩ යටින් තබා මුව පැටවා ගොඩට එසවීය.',
      },
      {
        id: 'ys-q4',
        questionEn: 'What does Sumana show about true strength?',
        questionSi: 'සැබෑ ශක්තිය ගැන සුමන පෙන්වා දුන්නේ කුමක්ද?',
        options: [
          'Scaring tiny animals away',
          'Staying away from everyone',
          'Using big power to protect small friends',
          'Running faster than deer',
        ],
        optionsSi: [
          'පුංචි සතුන් බිය ගැන්වීම',
          'හැමෝගෙන්ම ඈත්ව සිටීම',
          'තමන්ගේ ලොකු බලයෙන් පුංචි මිතුරන් ආරක්ෂා කිරීම',
          'මුවන්ට වඩා වේගයෙන් දිවීම',
        ],
        correctIndex: 2,
        explanationSi: 'විශාල ශක්තියක් ඇති අය අසරණ පුංචි සතුන් ආරක්ෂා කිරීම සැබෑ ශක්තියයි.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 4. Heritage, History & Mystery: The Secret Treasure of Sigiriya
  // --------------------------------------------------------------------------
  {
    id: 'true-treasure-of-sigiriya',
    categoryId: 'heritage',
    categoryTitleEn: '4. Heritage, History & Mystery',
    categoryTitleSi: 'උරුමය, ඉතිහාසය සහ අභිරහස්',
    titleEn: 'The Secret Treasure of Sigiriya',
    titleSi: 'සීගිරියේ අපූරු නිධානය',
    level: 'Elementary (A2)',
    genreEn: 'Heritage, History & Mystery',
    genreSi: 'උරුමය, ඉතිහාසය සහ අභිරහස්',
    estimatedMinutes: 3,
    coverAccent: '#b45309',
    coverImage: sigiriyaNimalCover,
    theme: 'mystic',
    chapters: [
      {
        id: 'sigiriya-ch1',
        chapterNumber: 1,
        titleEn: 'The Lion Rock Legend',
        titleSi: 'සිංහගිරි කතාන්දරය',
        subtitleEn: 'Ten-year-old Nimal goes looking for gold',
        subtitleSi: 'නිධානයක් සොයා යන පුංචි නිමල්',
        summaryEn: 'Young Nimal hears stories of King Kashyapa’s hidden palace gold and packs his red notebook to climb Sigiriya.',
        summarySi: 'කාශ්‍යප රජුගේ සැඟවුණු රන් නිධානය සොයා ගැනීමේ ආසාවෙන් නිමල් රතු සටහන් පොත රැගෙන සීගිරිය බලා යයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'sig-1-1',
            'High above the green trees of Matale rises Sigiriya, the giant lion rock where an old Sri Lankan king built his sky palace.',
            'මාතලේ නිල්ල පිරුණු ගස්වලට ඉහළින් නැඟී සිටින්නේ, පැරණි රජ කෙනෙකු අහස් මාලිගාවක් හැදූ යෝධ සීගිරි පර්වතයයි.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-1-2',
            'For years, village kids whispered stories of a secret treasure box full of gold coins hidden behind a magic stone door.',
            'කාලයක් තිස්සේ ගමේ ළමයි කතා වුණේ ගල් දොරක් පිටිපස හංගපු රන් කාසි පිරුණු රහස් නිධන් පෙට්ටියක් ගැනයි.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-1-3',
            'Ten-year-old Nimal packed his bright red notebook and a small torch, ready to find it with his Appachchi.',
            'දහ හැවිරිදි නිමල් තමන්ගේ දීප්තිමත් රතු සටහන් පොතත් පුංචි විදුලි පන්දමත් බෑගයට දාගෙන අප්පච්චි එක්ක එය හොයන්න සූදානම් වුණා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
        ],
        keyVocabulary: [
          SIGIRIYA_TREASURE_VOCAB.rock,
          SIGIRIYA_TREASURE_VOCAB.palace,
          SIGIRIYA_TREASURE_VOCAB.secret,
          SIGIRIYA_TREASURE_VOCAB.treasure,
        ],
        funFactEn: 'King Kashyapa built the Lion Rock palace over 1,500 years ago — and visitors from all over the world love it!',
        funFactSi: 'වසර 1,500කටත් පෙර කාශ්‍යප රජු ඉදිකළ සීගිරිය අද ලෝකයේම සංචාරකයන්ගේ ආදරය දිනාගත් ස්ථානයකි.',
      },
      {
        id: 'sigiriya-ch2',
        chapterNumber: 2,
        titleEn: 'Searching Every Stone',
        titleSi: 'ගල් පඩි දිගේ සෙවීම',
        subtitleEn: 'Peeking into cool caves and cracks',
        subtitleSi: 'සීතල ගල් ගුහා සහ පැළුම් පිරික්සීම',
        summaryEn: 'Climbing the cool stone steps, Nimal taps old brick walls and peeks inside shaded caves hoping for a secret door.',
        summarySi: 'ගල් පඩිපෙළ නඟිමින් නිමල් සෑම ගුහාවකටම එබී බලමින් රහස් දොරක් සොයයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'sig-2-1',
            'Together, Nimal and Appachchi began to climb the winding stone steps beside cool lotus ponds.',
            'සිසිල් නෙළුම් පොකුණු අසලින් වැටී තිබුණු වංගු ගල් පඩිපෙළ දිගේ නිමල් සහ අප්පච්චි ඉහළට නඟින්න පටන් ගත්තා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-2-2',
            'At every shaded cave, Nimal peeked inside with his torch and tapped gently on the ancient wall.',
            'හැම සෙවණැලි ගල් ගුහාවක් ළඟම නිමල් විදුලි පන්දම දල්වලා ඇතුළට එබී බලමින් පැරණි බිත්තියට හෙමින් තට්ටු කළා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-2-3',
            '"Tap, tap! Maybe a hidden switch will click!" he giggled, checking even the giant stone lion paws.',
            '"ටක්, ටක්! සමහරවිට රහස් බොත්තමක් ඇරේවි!" කියා හිනාවෙමින් ඔහු යෝධ ගල් සිංහ පාද පවා පරීක්ෂා කළා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
        ],
        keyVocabulary: [
          SIGIRIYA_TREASURE_VOCAB.climb,
          SIGIRIYA_TREASURE_VOCAB.steps,
          SIGIRIYA_TREASURE_VOCAB.cave,
          SIGIRIYA_TREASURE_VOCAB.wall,
        ],
        funFactEn: 'Look at "Tap, tap!" — sound words make reading English stories fun and easy to picture.',
        funFactSi: '"Tap, tap!" වැනි ශබ්ද වචන කතාවක් කියවන විට එය හරියට ඇස් ඉදිරිපිට පෙනෙනවා වැනි හැඟීමක් ලබා දෙයි.',
      },
      {
        id: 'sigiriya-ch3',
        chapterNumber: 3,
        titleEn: 'Top of the Sky',
        titleSi: 'අහස අද්දර මුදුන',
        subtitleEn: 'A cool breeze and a quiet sigh',
        subtitleSi: 'සිසිල් සුළඟ සහ පුංචි කලකිරීම',
        summaryEn: 'At the breezy rock top beside the bright blue bathing pool, Nimal wonders why he found no chest of gold.',
        summarySi: 'පර්වත මුදුනේ නිල්වන් පොකුණ අසල සිටින නිමල්ට රන් මංජුසාවක් හමු නොවූ නිසා පුංචි දුකක් දැනෙයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'sig-3-1',
            'Soon they reached the flat sunny top, where fresh mountain wind danced across a sparkling stone pool.',
            'ටික වේලාවකින් ඔවුන් පර්වත මුදුනට ළඟා වුණා; එතැන දිදුලන ගල් පොකුණ උඩින් සිසිල් කඳුකර සුළඟ හමා ගියා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-3-2',
            'Nimal checked his empty hands, sat by the brick steps, and let out a tiny sad sigh.',
            'හිස් අත් දෙක දිහා බලපු නිමල් ගඩොල් පඩිය උඩ වාඩි වෙලා පුංචි දුක් සුසුමක් හෙළුවා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-3-3',
            '"Appachchi, we walked so far up the mountain, so why is there no box of gold?" he asked softly.',
            '"අප්පච්චි, අපි මෙච්චර දුර කන්ද නැග්ගත් ඇයි රත්තරන් පෙට්ටියක් නැත්තේ?" කියා ඔහු හෙමින් ඇසුවා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
        ],
        keyVocabulary: [
          SIGIRIYA_TREASURE_VOCAB.pool,
        ],
        funFactEn: 'Even today, rainwater fills the royal stone pool at the very top of Sigiriya rock!',
        funFactSi: 'සීගිරියේ ඉහළම මුදුනේ පිහිටි රාජකීය ගල් පොකුණ අදටත් වැසි ජලයෙන් පිරී පවතී.',
      },
      {
        id: 'sigiriya-ch4',
        chapterNumber: 4,
        titleEn: 'The Gold That Never Fades',
        titleSi: 'නොමැකෙන සැබෑ රත්තරන්',
        subtitleEn: 'A wise answer from Appachchi',
        subtitleSi: 'අප්පච්චිගේ නුවණැති පිළිතුර',
        summaryEn: 'Appachchi shows Nimal that ancient pools, paintings, and proud history are a treasure far richer than gold.',
        summarySi: 'අපේ පැරණි චිත්‍ර, ජල පොකුණු සහ අභිමානවත් ඉතිහාසය රත්තරන්වලටත් වඩා වටිනා නිධානයක් බව නිමල් තේරුම් ගනී.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'sig-4-1',
            'Wise Appachchi smiled, put a warm arm around Nimal, and pointed to the bright wall paintings and the green land below.',
            'නුවණැති අප්පච්චි හිනාවෙලා, නිමල්ගේ කරට අත දාලා, ලස්සන බිතුසිතුවම් සහ පහළ පෙනෙන හරිත බිම් දිහාවට අත දිගු කළා.',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-4-2',
            '"Look closely, son. Rain still fills these royal stone pools, and those colorful paintings still glow after a thousand years!"',
            '"හොඳින් බලන්න පුතේ. වසර දාහකට පස්සෙත් මේ රාජකීය පොකුණු වැහි වතුරෙන් පිරෙනවා, අර පාට පාට සිතුවම් අදත් බබළනවා!"',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-4-3',
            '"Gold coins get spent and forgotten, Nimal, yet smart ideas, beauty, and proud history belong to us forever."',
            '"රන් කාසි වියදම් වෙලා අමතක වෙලා යනවා නිමල්; ඒත් අපේ මුතුන් මිත්තන්ගේ බුද්ධිය, සුන්දරත්වය සහ ඉතිහාසය හැමදාටම අපට අයිතියි."',
            SIGIRIYA_TREASURE_VOCAB
          ),
          createSentence(
            'sig-4-4',
            'Nimal grinned wide, opened his red notebook, and drew a big shining crown—proud to hold the true treasure in his heart.',
            'නිමල් ලොකු හිනාවක් දාලා, රතු සටහන් පොත ඇරලා දිදුලන ඔටුන්නක් ඇන්දා—සැබෑ නිධානය තමන්ගේ හදවතේ රැඳුණු බවට හරිම ආඩම්බරයෙන්!',
            SIGIRIYA_TREASURE_VOCAB
          ),
        ],
        keyVocabulary: [
          SIGIRIYA_TREASURE_VOCAB.wise,
          SIGIRIYA_TREASURE_VOCAB.paintings,
          SIGIRIYA_TREASURE_VOCAB.beauty,
          SIGIRIYA_TREASURE_VOCAB.history,
          SIGIRIYA_TREASURE_VOCAB.proud,
        ],
        funFactEn: 'Look for the famous Sigiriya Frescoes — ancient colorful paintings preserved naturally inside a rock shelter!',
        funFactSi: 'සීගිරි ගල් ගුහාවක ස්වභාවිකව සුරැකුණු සීගිරි ලලනාවන්ගේ බිතුසිතුවම් අදටත් එලෙසම දිස්වේ.',
      },
    ],
    quiz: [
      {
        id: 'sig-q1',
        questionEn: 'What did Nimal pack in his bag before climbing Sigiriya?',
        questionSi: 'සීගිරිය නඟින්න පෙර නිමල් තම බෑගයේ දමාගත්තේ කුමක්ද?',
        options: [
          'A fishing rod and net',
          'A bright red notebook and a small torch',
          'A heavy shovel',
          'A basket of bananas',
        ],
        optionsSi: [
          'බිලී පිත්තක් හා දැලක්',
          'දීප්තිමත් රතු සටහන් පොතක් සහ පුංචි විදුලි පන්දමක්',
          'බර සවලක්',
          'කෙසෙල් කූඩයක්',
        ],
        correctIndex: 1,
        explanationSi: 'රහස් නිධානය සෙවීම සඳහා නිමල් රතු සටහන් පොතක් හා පුංචි විදුලි පන්දමක් රැගෙන ගියේය.',
      },
      {
        id: 'sig-q2',
        questionEn: 'Why did Nimal tap gently on the cave walls?',
        questionSi: 'නිමල් ගල් ගුහා බිත්තිවලට හෙමින් තට්ටු කළේ ඇයි?',
        options: [
          'He was looking for wild bats',
          'He hoped a secret door or switch would open to gold coins',
          'He wanted to wake up his Appachchi',
          'He lost his red pen',
        ],
        optionsSi: [
          'වවුලන් සෙවීමට',
          'රන් කාසි ඇති රහස් දොරක් ඇරේවි යැයි සිතූ නිසා',
          'අප්පච්චි අවදි කිරීමට',
          'රතු පෑන නැති වූ නිසා',
        ],
        correctIndex: 1,
        explanationSi: 'රහස් දොරක් හෝ බොත්තමක් තිබේදැයි බැලීමට නිමල් සෑම බිත්තියකටම තට්ටු කළේය.',
      },
      {
        id: 'sig-q3',
        questionEn: 'What surprised Nimal at the flat top of Sigiriya?',
        questionSi: 'සීගිරි මුදුනේදී නිමල් දැක්කේ කුමක්ද?',
        options: [
          'A shiny new car',
          'A sparkling stone pool filled under the fresh mountain wind',
          'A big crowd of monkeys eating bread',
          'A deep snow mountain',
        ],
        optionsSi: [
          'දිදුලන අලුත් කාර් රථයක්',
          'සිසිල් කඳු සුළඟ මැද දිදුලන ගල් පොකුණක්',
          'පාන් කන වඳුරන් පිරිසක්',
          'හිම කන්දක්',
        ],
        correctIndex: 1,
        explanationSi: 'සීගිරි මුදුනේදී අහසට ඉහළින් සිසිල් සුළං හමන ගල් පොකුණ ඔහු දුටුවේය.',
      },
      {
        id: 'sig-q4',
        questionEn: 'What did Appachchi say is the true treasure of Sigiriya?',
        questionSi: 'සීගිරියේ සැබෑ නිධානය කුමක් බවද අප්පච්චි පැවසුවේ?',
        options: [
          'Old coins under the grass',
          'Smart ideas, lasting beauty, and proud history',
          'A magic golden ring',
          'A shiny red torch',
        ],
        optionsSi: [
          'තණකොළ යට ඇති පැරණි කාසි',
          'මුතුන් මිත්තන්ගේ බුද්ධිය, නොමැකෙන සුන්දරත්වය සහ අභිමානවත් ඉතිහාසය',
          'මායා රන් මුදුවක්',
          'දිදුලන රතු විදුලි පන්දමක්',
        ],
        correctIndex: 1,
        explanationSi: 'වියදම් වී යන රන් කාසි නොව, කාලයට නොමැකෙන අපේ උරුමය සහ බුද්ධිය සැබෑ නිධානයයි.',
      },
    ],
  },
  ...ADDITIONAL_STORIES,
];

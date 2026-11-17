import { Story, StorySentence, VocabularyWord } from '../types/story';
import villagePotterCover from '../assets/images/village_potter_1794154597308.jpg';
import cinnamonBreadCover from '../assets/images/cinnamon_loaf_1793981258154.jpg';
import seaTurtleCover from '../assets/images/sea_turtle_1794154561537.jpg';
import galleClockTowerCover from '../assets/images/clockmaker_tower_1793981214576.jpg';

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
// VOCABULARY 5: The Little Clay Lamp (A1)
// ----------------------------------------------------------------------------
const POTTER_VOCAB: Record<string, VocabularyWord> = {
  clay: {
    word: 'clay',
    phonetic: '/kleɪ/',
    sinhalaMeaning: 'මැටි',
    englishDefinition: 'Soft, wet earth used for making pots and lamps.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  wheel: {
    word: 'wheel',
    phonetic: '/wiːl/',
    sinhalaMeaning: 'සකපෝරුව / රෝදය',
    englishDefinition: 'A round spinning table used by a potter.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  lamp: {
    word: 'lamp',
    phonetic: '/læmp/',
    sinhalaMeaning: 'පහන',
    englishDefinition: 'A small dish with oil and a wick that gives warm light.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  plain: {
    word: 'plain',
    phonetic: '/pleɪn/',
    sinhalaMeaning: 'චාම් / සරල',
    englishDefinition: 'Simple and neat without fancy paint or gold.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  laugh: {
    word: 'laugh',
    phonetic: '/lɑːf/',
    sinhalaMeaning: 'හිනා වෙනවා',
    englishDefinition: 'To smile and make happy sounds when amused.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  wind: {
    word: 'wind',
    phonetic: '/wɪnd/',
    sinhalaMeaning: 'සුළඟ',
    englishDefinition: 'Fast moving air blowing outside.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  dark: {
    word: 'dark',
    phonetic: '/dɑːk/',
    sinhalaMeaning: 'අඳුරු',
    englishDefinition: 'Having little or no light.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  flame: {
    word: 'flame',
    phonetic: '/fleɪm/',
    sinhalaMeaning: 'ගිනි දැල්ල / පහන් දැල්ල',
    englishDefinition: 'The bright orange tongue of fire on a lamp or candle.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  glow: {
    word: 'glow',
    phonetic: '/ɡləʊ/',
    sinhalaMeaning: 'මෘදු ආලෝකය / දිස්නය',
    englishDefinition: 'A soft, steady, warm shine of light.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  path: {
    word: 'path',
    phonetic: '/pɑːθ/',
    sinhalaMeaning: 'අඩි පාර / මඟ',
    englishDefinition: 'A small walking road through a village or garden.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  bright: {
    word: 'bright',
    phonetic: '/braɪt/',
    sinhalaMeaning: 'දීප්තිමත්',
    englishDefinition: 'Full of clear, shining light.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  proud: {
    word: 'proud',
    phonetic: '/praʊd/',
    sinhalaMeaning: 'ආඩම්බර / සතුටු',
    englishDefinition: 'Feeling happy about good work you have done.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
};

// ----------------------------------------------------------------------------
// VOCABULARY 6: The Sweet Cinnamon Loaf (A2)
// ----------------------------------------------------------------------------
const CINNAMON_VOCAB: Record<string, VocabularyWord> = {
  baker: {
    word: 'baker',
    phonetic: '/ˈbeɪ.kər/',
    sinhalaMeaning: 'බේකරි මාමා / පාන් සාදන්නා',
    englishDefinition: 'A person who bakes bread, buns, and cakes.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  dough: {
    word: 'dough',
    phonetic: '/dəʊ/',
    sinhalaMeaning: 'පිටි මෝලිය',
    englishDefinition: 'Soft mixed flour ready to bake into bread.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  oven: {
    word: 'oven',
    phonetic: '/ˈʌv.ən/',
    sinhalaMeaning: 'පෝරණුව / උදුන',
    englishDefinition: 'A hot closed space used for baking bread.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  sweet: {
    word: 'sweet',
    phonetic: '/swiːt/',
    sinhalaMeaning: 'මිහිරි / පැණි රස',
    englishDefinition: 'Having a pleasant sugary taste or warm scent.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  smell: {
    word: 'smell',
    phonetic: '/smel/',
    sinhalaMeaning: 'සුවඳ',
    englishDefinition: 'What you sense in the air with your nose.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  puddle: {
    word: 'puddle',
    phonetic: '/ˈpʌd.əl/',
    sinhalaMeaning: 'වතුර වළ',
    englishDefinition: 'A small pool of rainwater on the road.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  wet: {
    word: 'wet',
    phonetic: '/wet/',
    sinhalaMeaning: 'තෙත් වුණු / තෙමුණු',
    englishDefinition: 'Covered in rain or water.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  slice: {
    word: 'slice',
    phonetic: '/slaɪs/',
    sinhalaMeaning: 'පෙත්ත',
    englishDefinition: 'A warm, thick piece cut from a loaf of bread.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  wrap: {
    word: 'wrap',
    phonetic: '/ræp/',
    sinhalaMeaning: 'ඔතනවා',
    englishDefinition: 'To fold clean paper or a leaf neatly around food.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  gift: {
    word: 'gift',
    phonetic: '/ɡɪft/',
    sinhalaMeaning: 'තෑග්ග',
    englishDefinition: 'Something kind given freely to make someone happy.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  fresh: {
    word: 'fresh',
    phonetic: '/freʃ/',
    sinhalaMeaning: 'නැවුම් / අලුත්',
    englishDefinition: 'Just picked from a tree or just baked hot.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  smile: {
    word: 'smile',
    phonetic: '/smaɪl/',
    sinhalaMeaning: 'සිනහව',
    englishDefinition: 'A happy curved look on your face.',
    partOfSpeech: 'noun',
    highlight: true,
  },
};

// ----------------------------------------------------------------------------
// VOCABULARY 7: Moonlight on Rekawa Beach (A2)
// ----------------------------------------------------------------------------
const TURTLE_REKAWA_VOCAB: Record<string, VocabularyWord> = {
  moon: {
    word: 'moon',
    phonetic: '/muːn/',
    sinhalaMeaning: 'සඳ / හඳ',
    englishDefinition: 'The bright round silver light in the night sky.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  beach: {
    word: 'beach',
    phonetic: '/biːtʃ/',
    sinhalaMeaning: 'මුහුදු වෙරළ',
    englishDefinition: 'Warm sand beside the ocean waves.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  sand: {
    word: 'sand',
    phonetic: '/sænd/',
    sinhalaMeaning: 'වැලි',
    englishDefinition: 'Tiny soft grains covering the shore.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  swim: {
    word: 'swim',
    phonetic: '/swɪm/',
    sinhalaMeaning: 'පිහිනනවා',
    englishDefinition: 'To move smoothly through water using fins or flippers.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  nest: {
    word: 'nest',
    phonetic: '/nest/',
    sinhalaMeaning: 'කූඩුව',
    englishDefinition: 'A safe sandy hole or cozy spot made to hold eggs.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  eggs: {
    word: 'eggs',
    phonetic: '/eɡz/',
    sinhalaMeaning: 'බිත්තර',
    englishDefinition: 'Smooth round shells where baby turtles grow.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  waves: {
    word: 'waves',
    phonetic: '/weɪvz/',
    sinhalaMeaning: 'මුහුදු රළ',
    englishDefinition: 'Moving lines of water rolling onto the beach.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  tiny: {
    word: 'tiny',
    phonetic: '/ˈtaɪ.ni/',
    sinhalaMeaning: 'ඉතා කුඩා / පුංචි',
    englishDefinition: 'Very, very small.',
    partOfSpeech: 'adjective',
    highlight: true,
  },
  race: {
    word: 'race',
    phonetic: '/reɪs/',
    sinhalaMeaning: 'තරගෙට දුවනවා',
    englishDefinition: 'To hurry forward quickly side by side.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  ocean: {
    word: 'ocean',
    phonetic: '/ˈəʊ.ʃən/',
    sinhalaMeaning: 'මහා සාගරය',
    englishDefinition: 'The vast deep salt water stretching to the sky.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  cheer: {
    word: 'cheer',
    phonetic: '/tʃɪər/',
    sinhalaMeaning: 'සතුටින් බලා සිටිනවා',
    englishDefinition: 'To clap or smile happily to encourage someone.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  home: {
    word: 'home',
    phonetic: '/həʊm/',
    sinhalaMeaning: 'නිවහන / ගෙදර',
    englishDefinition: 'The safe place where a creature belongs.',
    partOfSpeech: 'noun',
    highlight: true,
  },
};

// ----------------------------------------------------------------------------
// VOCABULARY 8: The Singing Clock of Galle Fort (A2)
// ----------------------------------------------------------------------------
const CLOCKTOWER_VOCAB: Record<string, VocabularyWord> = {
  tower: {
    word: 'tower',
    phonetic: '/ˈtaʊ.ər/',
    sinhalaMeaning: 'කුලුන',
    englishDefinition: 'A tall narrow stone building looking out far.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  stairs: {
    word: 'stairs',
    phonetic: '/steəz/',
    sinhalaMeaning: 'පඩිපෙළ',
    englishDefinition: 'Steps going round and up inside a building.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  clock: {
    word: 'clock',
    phonetic: '/klɒk/',
    sinhalaMeaning: 'ඔරලෝසුව',
    englishDefinition: 'A machine with hands and bells that tells the time.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  wheels: {
    word: 'wheels',
    phonetic: '/wiːlz/',
    sinhalaMeaning: 'දත් රෝද',
    englishDefinition: 'Round brass parts that turn smoothly together.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  fog: {
    word: 'fog',
    phonetic: '/fɒɡ/',
    sinhalaMeaning: 'මීදුම',
    englishDefinition: 'Thick white mist near the sea that hides the view.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  boats: {
    word: 'boats',
    phonetic: '/bəʊts/',
    sinhalaMeaning: 'බෝට්ටු',
    englishDefinition: 'Wooden fishing vessels riding on the waves.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  shore: {
    word: 'shore',
    phonetic: '/ʃɔːr/',
    sinhalaMeaning: 'වෙරළ තීරය',
    englishDefinition: 'The edge of land right beside the sea.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  bell: {
    word: 'bell',
    phonetic: '/bel/',
    sinhalaMeaning: 'සීනුව',
    englishDefinition: 'A heavy brass cup that makes a loud musical ring.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  ring: {
    word: 'ring',
    phonetic: '/rɪŋ/',
    sinhalaMeaning: 'නාද වෙනවා',
    englishDefinition: 'To make a clear musical chime sound.',
    partOfSpeech: 'verb',
    highlight: true,
  },
  echo: {
    word: 'echo',
    phonetic: '/ˈek.əʊ/',
    sinhalaMeaning: 'දෝංකාරය',
    englishDefinition: 'A clear sound bouncing far across open water.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  harbor: {
    word: 'harbor',
    phonetic: '/ˈhɑː.bər/',
    sinhalaMeaning: 'වරාය',
    englishDefinition: 'A calm shelter on the coast where boats rest safely.',
    partOfSpeech: 'noun',
    highlight: true,
  },
  story: {
    word: 'story',
    phonetic: '/ˈstɔː.ri/',
    sinhalaMeaning: 'කතාව',
    englishDefinition: 'A living memory passed warmly from old to young.',
    partOfSpeech: 'noun',
    highlight: true,
  },
};

export const ADDITIONAL_STORIES: Story[] = [
  // --------------------------------------------------------------------------
  // Story 5: Folk Tales — The Little Clay Lamp
  // --------------------------------------------------------------------------
  {
    id: 'wise-potter-clay-lamp',
    categoryId: 'folktales',
    categoryTitleEn: '1. Folk Tales & Parables',
    categoryTitleSi: 'ජන කතා සහ උපමා කතා',
    titleEn: 'The Little Clay Lamp',
    titleSi: 'පුංචි මැටි පහනේ කතාව',
    level: 'Beginner (A1)',
    genreEn: 'Folk Tale & Parable',
    genreSi: 'ජන කතා සහ උපමා කතා',
    estimatedMinutes: 3,
    coverAccent: '#b45309',
    coverImage: villagePotterCover,
    theme: 'nature',
    chapters: [
      {
        id: 'potter-ch1',
        chapterNumber: 1,
        titleEn: 'The Spinning Wheel',
        titleSi: 'කැරකෙන සකපෝරුව',
        subtitleEn: 'Seeya makes lamps from river clay',
        subtitleSi: 'සීයා ගඟේ මැටිවලින් පහන් සෑදීම',
        summaryEn: 'Grandpa Dingiri spins soft red clay on his wooden wheel while little Nethmi watches with wonder.',
        summarySi: 'ඩිංගිරි සීයා සකපෝරුව කරකවමින් පුංචි මැටි පහන් සාදන හැටි නෙත්මි ආසාවෙන් බලා සිටී.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'pot-1-1',
            'Near the Kelani river, Grandpa Dingiri sat by his wooden wheel and shaped soft red clay with gentle hands.',
            'කැලණි ගඟ අසල ඩිංගිරි සීයා තමන්ගේ ලී සකපෝරුව ළඟ ඉඳගෙන මෘදු රතු මැටිවලින් ලස්සන හැඩ මැව්වා.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-1-2',
            'Round and round spun the wheel—whoosh, whoosh—making neat little bowls for tiny oil lamps.',
            'සකපෝරුව වටේට කැරකුණා—වූෂ්, වූෂ්—පුංචි තෙල් පහන්වලට හරිම ලස්සන කෝප්ප හැදෙමින්.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-1-3',
            'His little granddaughter Nethmi clapped her hands: "Seeya, each plain brown lamp looks like a smiling flower!"',
            'පුංචි මිණිබිරි නෙත්මි අත්පුඩි ගහලා කීවා: "සීයේ, මේ චාම් දුඹුරු පහනක් පිපුණු මලක් වගේ!"',
            POTTER_VOCAB
          ),
        ],
        keyVocabulary: [
          POTTER_VOCAB.wheel,
          POTTER_VOCAB.clay,
          POTTER_VOCAB.lamp,
          POTTER_VOCAB.plain,
        ],
        funFactEn: 'Potters in Kelaniya and Kegalle shape Sri Lankan oil lamps by hand without needing machines.',
        funFactSi: 'කැලණිය හා කෑගල්ල ප්‍රදේශවල කුඹල් ශිල්පීන් අදටත් අතින්ම ලස්සන මැටි පහන් නිර්මාණය කරති.',
      },
      {
        id: 'potter-ch2',
        chapterNumber: 2,
        titleEn: 'Shiny Cups and Proud Voices',
        titleSi: 'දිදුලන කෝප්ප සහ සිනහා හඬ',
        subtitleEn: 'Rich traders laugh at plain clay',
        subtitleSi: 'චාම් මැටි පහන් දැක හිනාවුණු වෙළෙන්දෝ',
        summaryEn: 'City traders pass by with painted paper lanterns and laugh at Seeya’s plain clay lamps.',
        summarySi: 'පාට කඩදාසි පහන් ගෙනා වෙළෙන්දෝ සීයාගේ චාම් මැටි පහන් දැක සිනාසෙති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'pot-2-1',
            'Two rich traders walked past the hut holding shiny glass jars and bright paper lanterns.',
            'දිදුලන වීදුරු බෝතල් හා පාට කඩදාසි කූඩු අරගත්ත පොහොසත් වෙළෙන්දෝ දෙන්නෙක් පැල්පත ළඟින් ගියා.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-2-2',
            'They started to laugh when they saw Seeya’s shelf: "Who wants plain brown mud? Look how fancy ours shine!"',
            'සීයාගේ රාක්කය දැකලා ඔවුන් හිනාවෙන්න පටන් ගත්තා: "කවුද මේ චාම් මැටි ගන්නේ? බලන්න අපේ ඒවායේ හැඩ!"',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-2-3',
            'Seeya only smiled calmly and lit five clay lamps on his front step. "Wait for a windy night, friends."',
            'සීයා සන්සුන්ව හිනාවෙලා ඉදිරිපස පඩියේ මැටි පහන් පහක් දැල්වුවා. "සුළං හමන රැයක් එනකල් බලා ඉන්න යාළුවනේ."',
            POTTER_VOCAB
          ),
        ],
        keyVocabulary: [
          POTTER_VOCAB.laugh,
          POTTER_VOCAB.bright,
        ],
        funFactEn: 'Look how polite "Wait for a windy night, friends" sounds — calm confidence speaks softly!',
        funFactSi: 'තරහ නොගෙන සන්සුන්ව පිළිතුරු දීම ඉංග්‍රීසි කතාවල බොහෝ විට දක්නට ලැබෙන සුන්දර ගුණයකි.',
      },
      {
        id: 'potter-ch3',
        chapterNumber: 3,
        titleEn: 'The Evening Wind',
        titleSi: 'රාත්‍රී සුළඟ',
        subtitleEn: 'When tall lights went dark',
        subtitleSi: 'උස් පහන් සියල්ල නිවී යාම',
        summaryEn: 'A strong evening breeze blows out the tall paper lanterns along the dark road, leaving only Seeya’s clay flames lit.',
        summarySi: 'සැඩ සුළඟට පාරේ තිබූ සියලු කඩදාසි පහන් නිවී ගියත්, සීයාගේ මැටි පහන් නොනිවී දැල්වේ.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'pot-3-1',
            'That night, cool gray clouds rolled in, and a wild wind blew fast down the village street.',
            'එදා රෑ සීතල වළාකුළු ඇවිත් ගමේ වීදිය දිගේ තද සුළඟක් වේගයෙන් හමන්න පටන් ගත්තා.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-3-2',
            'Whoosh! Out went the candles inside the paper lanterns, and the road turned completely dark.',
            'වූෂ්! කඩදාසි පහන් ඇතුළේ තිබුණු ඉටිපන්දම් නිවිලා ගිහින් මුළු පාරම එකවර අඳුරු වුණා.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-3-3',
            'Yet on Seeya’s small stone wall, every little curved clay lip hugged its warm orange flame safe from the wind!',
            'ඒත් සීයාගේ පුංචි ගල් තාප්පය උඩ, හැම වක්‍ර මැටි පහන් දාරයක්ම සුළඟින් තමන්ගේ උණුසුම් තැඹිලි ගිනි දැල්ල ආරක්ෂා කරගත්තා!',
            POTTER_VOCAB
          ),
        ],
        keyVocabulary: [
          POTTER_VOCAB.wind,
          POTTER_VOCAB.dark,
          POTTER_VOCAB.flame,
        ],
        funFactEn: 'A curved clay rim blocks side wind while feeding fresh air gently from above—clever ancient design!',
        funFactSi: 'මැටි පහනේ වක්‍ර හැඩය සුළං පහරින් දැල්ල රැකගෙන දිගටම දැල්වෙන්න උදව් කරයි.',
      },
      {
        id: 'potter-ch4',
        chapterNumber: 4,
        titleEn: 'A Golden Path Home',
        titleSi: 'ගෙදරට පාර පෙන්වූ රන් එළිය',
        subtitleEn: 'Simple things shine longest',
        subtitleSi: 'සරල දේවල් හැමදාමත් වටිනා හැටි',
        summaryEn: 'Children follow Seeya’s warm golden glow home, and the whole village comes to love his humble clay lamps.',
        summarySi: 'මැටි පහන්වල උණුසුම් ආලෝකය ඔස්සේ දරුවන් ගෙදර එන අතර, ගමම සීයාගේ පහන් අගය කරති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'pot-4-1',
            'Lost school children followed the warm golden glow along the wet path right up to Seeya’s cozy door.',
            'අඳුරේ පාර වැරදුණු පාසල් ළමයි තෙත් අඩි පාර දිගේ ආපු උණුසුම් රන්වන් ආලෝකය පස්සේ සීයාගේ දොර ළඟටම ආවා.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-4-2',
            'Even the two proud traders walked up quietly and bought ten clay lamps with warm smiles.',
            'අර ආඩම්බර වෙළෙන්දෝ දෙන්නත් හෙමින් ඇවිත් හිනාවෙලා මැටි පහන් දහයක්ම මිලදී ගත්තා.',
            POTTER_VOCAB
          ),
          createSentence(
            'pot-4-3',
            'Nethmi felt so proud as she placed a small lamp by her window: "Plain outside, bright inside—just like a good heart!"',
            'ජනේලය ළඟ පුංචි පහනක් තියපු නෙත්මිට හරිම ආඩම්බර හිතුණා: "පිටතින් චාම් වුණාට ඇතුළෙන් දීප්තිමත්—හරියට හොඳ හදවතක් වගේ!"',
            POTTER_VOCAB
          ),
        ],
        keyVocabulary: [
          POTTER_VOCAB.glow,
          POTTER_VOCAB.path,
          POTTER_VOCAB.proud,
        ],
        funFactEn: 'Lighting rows of clay oil lamps on Vesak night turns Sri Lankan lanes into a warm river of gold.',
        funFactSi: 'වෙසක් රාත්‍රියේ මිදුල පුරා මැටි පහන් වැල් දැල්වීම අපේ සුන්දරම සම්ප්‍රදායකි.',
      },
    ],
    quiz: [
      {
        id: 'pot-q1',
        questionEn: 'What did Grandpa Dingiri make on his spinning wooden wheel?',
        questionSi: 'ඩිංගිරි සීයා තම ලී සකපෝරුවෙන් හැදුවේ කුමක්ද?',
        options: [
          'Paper hats',
          'Little clay oil lamps',
          'Silver spoons',
          'Plastic cups',
        ],
        optionsSi: [
          'කඩදාසි තොප්පි',
          'පුංචි මැටි තෙල් පහන්',
          'රිදී හැඳි',
          'ප්ලාස්ටික් කෝප්ප',
        ],
        correctIndex: 1,
        explanationSi: 'සීයා ගඟේ මෘදු රතු මැටිවලින් පුංචි තෙල් පහන් නිර්මාණය කළේය.',
      },
      {
        id: 'pot-q2',
        questionEn: 'Why did the two traders laugh at Seeya’s lamps?',
        questionSi: 'වෙළෙන්දන් දෙදෙනා සීයාගේ පහන් දැක සිනාසුණේ ඇයි?',
        options: [
          'They thought plain brown clay looked dull next to fancy lanterns',
          'The lamps were broken',
          'They had never seen mud before',
          'The wheel spun too fast',
        ],
        optionsSi: [
          'විසිතුරු පහන් ඉදිරියේ චාම් දුඹුරු මැටි ලස්සන නැති බව සිතූ නිසා',
          'පහන් කැඩී තිබූ නිසා',
          'ඔවුන් මඩ දැක නොතිබූ නිසා',
          'රෝදය වේගයෙන් කැරකුණු නිසා',
        ],
        correctIndex: 0,
        explanationSi: 'දිදුලන කඩදාසි පහන් ඉදිරියේ චාම් මැටි පහන් වටින්නේ නැතැයි ඔවුන් සිතුවෝය.',
      },
      {
        id: 'pot-q3',
        questionEn: 'What happened when the strong wind blew at night?',
        questionSi: 'රාත්‍රියේදී තද සුළඟ හමද්දී සිදු වූයේ කුමක්ද?',
        options: [
          'Only the clay lamps kept their warm flames safe and lit',
          'All the houses flew away',
          'The paper lanterns stayed the brightest',
          'The river dried up',
        ],
        optionsSi: [
          'කඩදාසි පහන් නිවී ගියත් මැටි පහන්වල දැල්ල සුරක්ෂිතව දැල්වුණා',
          'සියලු ගෙවල් ගසාගෙන ගියා',
          'කඩදාසි කූඩු වඩාත් දීප්තිමත් වුණා',
          'ගඟ සිඳී ගියා',
        ],
        correctIndex: 0,
        explanationSi: 'මැටි පහනේ වක්‍ර දාරය සුළඟින් ගිනි දැල්ල ආරක්ෂා කරගත්තේය.',
      },
      {
        id: 'pot-q4',
        questionEn: 'How did the traders respond the next time they saw Seeya?',
        questionSi: 'පසුව සීයා හමුවූ විට වෙළෙන්දන් කළේ කුමක්ද?',
        options: [
          'They ran past without speaking',
          'They smiled and bought ten clay lamps',
          'They dropped their glass jars',
          'They laughed louder',
        ],
        optionsSi: [
          'කතා නොකර දුවගෙන ගියා',
          'හිනාවෙලා මැටි පහන් දහයක්ම මිලදී ගත්තා',
          'වීදුරු බෝතල් බිම දැම්මා',
          'තව හයියෙන් හිනා වුණා',
        ],
        correctIndex: 1,
        explanationSi: 'මැටි පහනේ සැබෑ වටිනාකම දුටු වෙළෙන්දෝ සිනාමුසුව පහන් දහයක්ම මිලදී ගත්හ.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Story 6: Village Life — The Sweet Cinnamon Loaf
  // --------------------------------------------------------------------------
  {
    id: 'golden-cinnamon-loaf',
    categoryId: 'village',
    categoryTitleEn: '2. Village & Everyday Life',
    categoryTitleSi: 'ගැමි ජීවිතය සහ එදිනෙදා කතා',
    titleEn: 'The Sweet Cinnamon Loaf',
    titleSi: 'මිහිරි කුරුඳු පාන් ගෙඩිය',
    level: 'Elementary (A2)',
    genreEn: 'Village & Everyday Life',
    genreSi: 'ගැමි ජීවිතය සහ එදිනෙදා කතා',
    estimatedMinutes: 3,
    coverAccent: '#15803d',
    coverImage: cinnamonBreadCover,
    theme: 'nature',
    chapters: [
      {
        id: 'cin-ch1',
        chapterNumber: 1,
        titleEn: 'The Dawn Bakery',
        titleSi: 'පාන්දර බේකරිය',
        subtitleEn: 'Warm sugar, butter, and southern cinnamon',
        subtitleSi: 'මිහිරි කුරුඳු සුවඳ පිරුණු උදෑසන',
        summaryEn: 'Every dawn before the birds sing, Uncle Sarath bakes warm loaves dusted with sweet Ceylon cinnamon.',
        summarySi: 'කුරුල්ලන් අවදි වන්නටත් පෙර සරත් මාමා කුරුඳු සුවඳ හමන උණුසුම් පාන් පුලුස්සයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'cin-1-1',
            'Before morning birds sang in our village, kind Uncle Sarath the baker was already smiling beside his warm brick oven.',
            'අපේ ගමේ උදේ කුරුල්ලන් නාද කරන්නත් කලින්, කරුණාවන්ත බේකරි මාමා වූ සරත් තමන්ගේ උණුසුම් ගඩොල් පෝරණුව ළඟ හිනාවෙවී වැඩ පටන් ගෙන තිබුණා.',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-1-2',
            'He rolled soft white dough, folded in golden butter, and shook fresh sweet cinnamon from Matara on top.',
            'ඔහු මෘදු සුදු පිටි මෝලිය අනලා, රන්වන් බටර් එකතු කරලා, උඩින් මාතර නැවුම් පැණි රස කුරුඳු කුඩු ඉස්සා.',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-1-3',
            'Soon a rich, happy smell floated out the window, waking sleepy cats and hungry neighbors down the lane.',
            'ටික වෙලාවකින් රසවත් සුවඳ ජනේලෙන් එළියට පාවෙලා ගිහින්, පාරේ නිදා හිටපු පූසන් හා බඩගිනි අසල්වැසියන් අවදි කළා.',
            CINNAMON_VOCAB
          ),
        ],
        keyVocabulary: [
          CINNAMON_VOCAB.baker,
          CINNAMON_VOCAB.oven,
          CINNAMON_VOCAB.dough,
          CINNAMON_VOCAB.sweet,
          CINNAMON_VOCAB.smell,
        ],
        funFactEn: 'Ceylon Cinnamon comes from Sri Lanka and is loved around the world for its soft, sweet smell!',
        funFactSi: 'ලොව හොඳම කුරුඳු (Ceylon Cinnamon) නිපදවන්නේ අපේ ශ්‍රී ලංකාවේ දකුණු පළාතෙයි.',
      },
      {
        id: 'cin-ch2',
        chapterNumber: 2,
        titleEn: 'A Sad Boy in the Rain',
        titleSi: 'වැස්සේ හිටපු දුක්බර පුතා',
        subtitleEn: 'Lost coins in a muddy puddle',
        subtitleSi: 'වතුර වළක වැටී නැතිවූ කාසි',
        summaryEn: 'On a rainy school morning, little Kasun stands outside staring into a puddle after dropping his lunch money.',
        summarySi: 'වැහි උදේක පාසල් යද්දී කෑමට ගෙනා කාසිය මඩ වළේ වැටී නැතිවූ කසුන් දුකින් බලා සිටී.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'cin-2-1',
            'One gray rainy morning, little Kasun stood outside the shop staring sadly at a brown puddle by the gate.',
            'වැහි බර අළු උදෑසනක, පුංචි කසුන් කඩේ ගේට්ටුව ළඟ මඩ වතුර වළක් දිහා දුකෙන් බලාගෙන හිටියා.',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-2-2',
            'His school uniform was wet, and his hands were shaking: "I dropped my lunch coin right here in the water!"',
            'ඔහුගේ පාසල් ඇඳුම තෙතමනයෙන් තෙමිලා, අත් වෙව්ලුවා: "මගේ දවල් කෑම කාසිය මේ වතුරේ වැටුණා!"',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-2-3',
            'Uncle Sarath spotted the worried boy from the counter and waved: "Come inside out of the cold, little brother!"',
            'කවුන්ටරය ළඟ හිටපු සරත් මාමා පුතාව දැකලා අත වැනුවා: "සීතලේ ඉන්න එපා මල්ලි, ඇතුළට එන්න!"',
            CINNAMON_VOCAB
          ),
        ],
        keyVocabulary: [
          CINNAMON_VOCAB.puddle,
          CINNAMON_VOCAB.wet,
        ],
        funFactEn: 'Notice how Sri Lankans kindly call younger kids "little brother" or "putha" — it shows warm care!',
        funFactSi: 'පුංචි අයට ආදරයෙන් "මල්ලි" හෝ "පුතේ" කියා කතා කිරීම අපේ සුන්දර සංස්කෘතික ලක්ෂණයකි.',
      },
      {
        id: 'cin-ch3',
        chapterNumber: 3,
        titleEn: 'The Secret Extra Loaf',
        titleSi: 'රහස් අමතර පාන් ගෙඩිය',
        subtitleEn: 'Baked especially for a quiet smile',
        subtitleSi: 'ආදරයෙන් දුන් උණුසුම් පාන් පෙත්ත',
        summaryEn: 'Sarath slices a steaming golden loaf he always bakes extra each morning and wraps it warmly for Kasun.',
        summarySi: 'සරත් මාමා හැම උදේකම පුලුස්සන විශේෂ පාන් ගෙඩියෙන් උණුසුම් පෙත්තක් කපා කසුන්ට ඔතා දෙයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'cin-3-1',
            'Every single day, Uncle Sarath baked one extra golden loaf—saved just for someone who needed a bright morning.',
            'හැම දවසකම සරත් මාමා අමතර රන්වන් පාන් ගෙඩියක් පිළිස්සුවා—ඒ උදෑසන සතුටක් ඕන කෙනෙකුට තෑගි දෙන්නමයි.',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-3-2',
            'He cut a thick, steaming slice of spiced bread, added a cup of warm milk, and began to wrap the rest in clean brown paper.',
            'ඔහු දුම් දමන කුරුඳු පාන් පෙත්තක් කපලා, උණු කිරි කෝප්පයකුත් දීලා, ඉතිරි ටික පිරිසිදු දුඹුරු කඩදාසියක ඔතන්න පටන් ගත්තා.',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-3-3',
            '"Take this to school, Kasun! Bread always tastes better when you eat with a happy friend."',
            '"මේක ඉස්කෝලෙට අරගෙන යන්න කසුන්! හොඳ යාළුවෙක් එක්ක කද්දී පාන්වල රස තවත් වැඩි වෙනවා."',
            CINNAMON_VOCAB
          ),
        ],
        keyVocabulary: [
          CINNAMON_VOCAB.slice,
          CINNAMON_VOCAB.wrap,
        ],
        funFactEn: '"Steaming hot" means so fresh from the oven that tiny clouds of warm steam rise up!',
        funFactSi: '"Steaming hot" කියන්නේ පෝරණුවෙන් ගත් ගමන් දුම් දමමින් තිබෙන උණුසුම් බවයි.',
      },
      {
        id: 'cin-ch4',
        chapterNumber: 4,
        titleEn: 'Mangoes in a Banana Leaf',
        titleSi: 'කෙසෙල් කොළේ ඔතා ආ අඹ',
        subtitleEn: 'Kindness always circles back home',
        subtitleSi: 'කරුණාව ආපසු එන අපූරු හැටි',
        summaryEn: 'After school, smiling Kasun returns with a neat green banana-leaf gift of ripe mangoes from his garden.',
        summarySi: 'පාසල් ඇරී එන කසුන් ගෙදර ගසේ ඉදුණු අඹ තෑග්ගක් කෙසෙල් කොළයක ඔතාගෙන සරත් මාමාට ගෙන එයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'cin-4-1',
            'At three o’clock, sunlight sparkled outside as Kasun ran back into the bakery holding a small green bundle.',
            'හවස තුනට ඉර එළිය පායද්දී, පුංචි කොළ පාට පාර්සලයක් අතේ තියාගෙන කසුන් ආයෙත් බේකරියට දුවගෙන ආවා.',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-4-2',
            'Inside the folded banana leaf lay three fresh yellow mangoes from his grandma’s tall garden tree—a thank-you gift!',
            'නවාපු කෙසෙල් කොළය ඇතුළේ තිබුණේ එයාගේ ආච්චිගේ වත්තේ ගහෙන් කැඩුව නැවුම් කහ අඹ ගෙඩි තුනක්—ස්තූති තෑග්ගක්!',
            CINNAMON_VOCAB
          ),
          createSentence(
            'cin-4-3',
            'Uncle Sarath ate a sweet mango and grinned with his biggest smile: one small loaf had baked friendship across the whole street.',
            'සරත් මාමා පැණි රස අඹයක් කාලා ලොකු සිනහවක් පෑවා: එක පුංචි පාන් ගෙඩියක් මුළු වීදියේම ආදරණීය මිතුදමක් හදලා තිබුණා.',
            CINNAMON_VOCAB
          ),
        ],
        keyVocabulary: [
          CINNAMON_VOCAB.fresh,
          CINNAMON_VOCAB.gift,
          CINNAMON_VOCAB.smile,
        ],
        funFactEn: 'In Sri Lanka, neighbors love gifting ripe mangoes or sweet bananas wrapped neatly in banana leaves.',
        funFactSi: 'වත්තේ ඉදුණු අඹ හෝ කෙසෙල් කෙසෙල් කොළේ ඔතා අසල්වැසියන්ට දීම අපේ හරිම ලස්සන සිරිතකි.',
      },
    ],
    quiz: [
      {
        id: 'cin-q1',
        questionEn: 'What special spice did Uncle Sarath shake over the bread dough?',
        questionSi: 'සරත් මාමා පාන් පිටි මෝලිය උඩ ඉස්සේ කුමන සුවඳවත් ද්‍රව්‍යයද?',
        options: [
          'Black pepper',
          'Fresh sweet cinnamon from Matara',
          'Chili flakes',
          'Green tea leaves',
        ],
        optionsSi: [
          'ගම්මිරිස්',
          'මාතර නැවුම් පැණි රස කුරුඳු කුඩු',
          'මිරිස් කෑලි',
          'තේ කොළ',
        ],
        correctIndex: 1,
        explanationSi: 'සරත් මාමා මාතරින් ගෙනා නැවුම් කුරුඳු කුඩු ඉස මිහිරි පාන් සෑදුවේය.',
      },
      {
        id: 'cin-q2',
        questionEn: 'Why was Kasun standing sadly by the puddle?',
        questionSi: 'කසුන් වතුර වළ ළඟ දුකින් බලා හිටියේ ඇයි?',
        options: [
          'He missed the school bus',
          'He dropped his lunch coin into the muddy water',
          'He forgot his shoes at home',
          'A dog chased him',
        ],
        optionsSi: [
          'ඔහුට පාසල් බසය මඟ හැරුණු නිසා',
          'ඔහුගේ දවල් කෑම කාසිය මඩ වතුරට වැටී නැති වූ නිසා',
          'සපත්තු ගෙදර අමතක වූ නිසා',
          'බල්ලෙක් පස්සෙන් පැන්නූ නිසා',
        ],
        correctIndex: 1,
        explanationSi: 'වැස්සේ පාසල් යන විට කසුන්ගේ දවල් කෑම මුදල මඩ වළේ වැටී තිබුණි.',
      },
      {
        id: 'cin-q3',
        questionEn: 'Why did Uncle Sarath bake one extra golden loaf every day?',
        questionSi: 'සරත් මාමා හැමදාම අමතර පාන් ගෙඩියක් පිළිස්සුවේ ඇයි?',
        options: [
          'To feed wild monkeys',
          'To give freely to someone who needed a happy morning',
          'Because his oven was too big',
          'To sell it at double price',
        ],
        optionsSi: [
          'වඳුරන්ට කන්න දීමට',
          'උදෑසන සතුටක් අවශ්‍ය කෙනෙකුට ආදරයෙන් තෑගි දීමට',
          'පෝරණුව ලොකු වැඩි නිසා',
          'දෙගුණයක් මිලට විකිණීමට',
        ],
        correctIndex: 1,
        explanationSi: 'කාට හෝ උදව්වක් අවශ්‍ය වූ විට දීමට ඔහු හැමදාම එක් පාන් ගෙඩියක් වෙන් කර තැබීය.',
      },
      {
        id: 'cin-q4',
        questionEn: 'What thank-you gift did Kasun bring back after school?',
        questionSi: 'පාසල් ඇරී එන ගමන් කසුන් සරත් මාමාට ගෙනා තෑග්ග කුමක්ද?',
        options: [
          'Three ripe yellow mangoes wrapped in a banana leaf',
          'A shiny silver coin',
          'A basket of red roses',
          'A new baking pan',
        ],
        optionsSi: [
          'කෙසෙල් කොළයක ඔතාගත් ඉදුණු කහ අඹ ගෙඩි තුනක්',
          'දිදුලන රිදී කාසියක්',
          'රතු රෝස මල් කූඩයක්',
          'අලුත් පාන් තැටියක්',
        ],
        correctIndex: 0,
        explanationSi: 'කසුන් තම ආච්චිගේ වත්තේ ගසෙන් කැඩූ නැවුම් කහ අඹ ගෙඩි තුනක් තෑග්ගක් ලෙස ගෙන ආවේය.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Story 7: Nature & Wildlife — Moonlight on Rekawa Beach
  // --------------------------------------------------------------------------
  {
    id: 'midnight-sea-turtle-rekawa',
    categoryId: 'nature',
    categoryTitleEn: '3. Sri Lankan Nature & Wildlife',
    categoryTitleSi: 'ලංකාවේ සොබාදහම සහ සතුන්',
    titleEn: 'Moonlight on Rekawa Beach',
    titleSi: 'හඳපානේ ආ කැස්බෑ අම්මා',
    level: 'Elementary (A2)',
    genreEn: 'Sri Lankan Nature & Wildlife',
    genreSi: 'ලංකාවේ සොබාදහම සහ සතුන්',
    estimatedMinutes: 3,
    coverAccent: '#0d9488',
    coverImage: seaTurtleCover,
    theme: 'maritime',
    chapters: [
      {
        id: 'rek-ch1',
        chapterNumber: 1,
        titleEn: 'A Quiet Night Swim',
        titleSi: 'නිහඬ රාත්‍රී ගමන',
        subtitleEn: 'Maya returns to her birth beach',
        subtitleSi: 'මායා තමන් උපන් වෙරළට පැමිණීම',
        summaryEn: 'Beneath the silver moon at Rekawa, mother sea turtle Maya swims onto the soft sand where she once hatched.',
        summarySi: 'රැකව වෙරළේ රිදී හඳපාන යටතේ, මායා කැස්බෑ අම්මා මීට වසර ගණනකට පෙර තමන් උපන් වැල්ලටම පිහිනා එයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'rek-1-1',
            'At midnight, a round silver moon shone softly over the quiet beach of Rekawa in southern Sri Lanka.',
            'මධ්‍යම රාත්‍රියේ, දකුණු ලංකාවේ නිස්කලංක රැකව වෙරළ උඩින් රිදී සඳ එළිය මෘදුව බැබළුණා.',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-1-2',
            'Through foaming white waves, a big sea turtle named Maya began to swim gently toward the soft warm sand.',
            'පෙණ දමන සුදු මුහුදු රළ අතරින්, මායා නම් ලොකු කැස්බෑ අම්මා මෘදු උණුසුම් වැල්ල දෙසට හෙමින් පිහිනන්න පටන් ගත්තා.',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-1-3',
            'Thirty years ago, Maya was born right here—and somehow her heart remembered the exact way home.',
            'මීට අවුරුදු තිහකට කලින් මායා ඉපදුණෙත් මේ වෙරළේමයි—කොහොම හරි ඇගේ හදවතට ආපහු ගෙදර එන පාර මතක තිබුණා.',
            TURTLE_REKAWA_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_REKAWA_VOCAB.moon,
          TURTLE_REKAWA_VOCAB.beach,
          TURTLE_REKAWA_VOCAB.waves,
          TURTLE_REKAWA_VOCAB.swim,
          TURTLE_REKAWA_VOCAB.home,
        ],
        funFactEn: 'Sea turtles can swim thousands of miles and still return to the very same beach where they hatched!',
        funFactSi: 'මුහුදු කැස්බෑවන් සැතපුම් දහස් ගණනක් පිහිනා ගියත් බිත්තර දැමීමට තමන් උපන් වෙරළටම නැවත පැමිණෙති.',
      },
      {
        id: 'rek-ch2',
        chapterNumber: 2,
        titleEn: 'Scoop, Scoop in the Sand',
        titleSi: 'වැල්ලේ හැදූ ආරක්ෂිත කූඩුව',
        subtitleEn: 'Ninety smooth eggs tucked away safe',
        subtitleSi: 'උණුසුම් වැලි යට සැඟවූ බිත්තර',
        summaryEn: 'Using her wide flippers like wooden spades, Maya digs a cozy nest and hides ninety smooth white eggs.',
        summarySi: 'තම පළල් පාදවලින් උණුසුම් වැල්ලේ කූඩුවක් හාරන මායා, සුදු පැහැති බිත්තර අනූවක් සුරක්ෂිතව වසා දමයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'rek-2-1',
            'High above the wet tide line, Maya used her wide flippers like little spoons: scoop, scoop, scoop went the dry sand.',
            'රළ නොවදින උස් වියළි වැල්ලේදී මායා තම පළල් පාද පුංචි හැඳි වගේ පාවිච්චි කළා: සර සර ගාලා වැලි ඉවතට විසි වුණා.',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-2-2',
            'Inside the deep cozy nest, she dropped ninety shiny white eggs that looked just like ping-pong balls!',
            'ගැඹුරු සුවපහසු කූඩුව ඇතුළේ, ඇය හරියටම පිං-පොං බෝල වගේ පෙනෙන දිදුලන සුදු බිත්තර අනූවක් දැමුවා!',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-2-3',
            'Slowly, she patted warm sand smoothly on top to hide them safe before sliding back into the dark sea.',
            'හෙමින් සැරේ ඇය උණුසුම් වැලිවලින් ඒවා සමතලා කර වසා සඟවා, ආපහු අඳුරු මුහුදට ලිස්සා ගියා.',
            TURTLE_REKAWA_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_REKAWA_VOCAB.sand,
          TURTLE_REKAWA_VOCAB.nest,
          TURTLE_REKAWA_VOCAB.eggs,
        ],
        funFactEn: 'Warm sand acts like a cozy natural blanket, keeping sea turtle eggs safe and warm for about 50–60 days.',
        funFactSi: 'උණුසුම් මුහුදු වැල්ල දින 50ත් 60ත් අතර කාලයක් කැස්බෑ බිත්තරවලට ස්වභාවික උණුසුම ලබා දෙයි.',
      },
      {
        id: 'rek-ch3',
        chapterNumber: 3,
        titleEn: 'Wiggling Under the Stars',
        titleSi: 'තරු අහස යට වෙව්ලන වැල්ල',
        subtitleEn: 'Tiny flippers racing to the sea',
        subtitleSi: 'සාගරය දෙසට දිව යන පුංචි පැටවුන්',
        summaryEn: 'Eight weeks later, tiny turtles pop out under the stars and follow the moonlight straight into the ocean.',
        summarySi: 'සති අටකට පසු වැල්ලෙන් මතුවන පුංචි පැටවුන් හඳ එළිය ඔස්සේ මහා සාගරය වෙත තරගෙට දිව යති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'rek-3-1',
            'Eight weeks later, on a quiet starry night, the warm sand began to wiggle and pop!',
            'සති අටකට පස්සේ නිහඬ තරු පිරුණු රැයක, උණුසුම් වැල්ල හෙමින් හෙලවෙන්න පටන් ගත්තා!',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-3-2',
            'Out poked dozens of tiny dark baby turtles, flapping their little flippers fast like wind-up toys.',
            'සෙල්ලම් බඩු වගේ පුංචි පාද වේගයෙන් ගසමින්, ඉතා කුඩා කළු පැහැති කැස්බෑ පැටවු දුසිම් ගණනක් එළියට ආවා.',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-3-3',
            'Following the white shine of the moon on the water, they began to race straight toward the cool blue ocean.',
            'වතුර උඩ බැබළෙන සුදු සඳ එළිය පස්සේ ගිහින්, ඔවුන් සිසිල් නිල් සාගරය දෙසට තරගෙට දුවන්න පටන් ගත්තා.',
            TURTLE_REKAWA_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_REKAWA_VOCAB.tiny,
          TURTLE_REKAWA_VOCAB.race,
          TURTLE_REKAWA_VOCAB.ocean,
        ],
        funFactEn: 'That is why bright hotel or street lights are kept off on Rekawa beach — baby turtles only follow the moonlit sea!',
        funFactSi: 'පුංචි පැටවුන් නොමඟ නොයා මුහුද සොයා ගැනීමට රැකව වෙරළේ විදුලි පහන් නොදල්වා අඳුරේ තබනු ලැබේ.',
      },
      {
        id: 'rek-ch4',
        chapterNumber: 4,
        titleEn: 'Friends in the Dark',
        titleSi: 'අඳුරේ සිටින ආරක්ෂක මිතුරන්',
        subtitleEn: 'Village guards watch quietly',
        subtitleSi: 'ගැමි ස්වේච්ඡා සේවකයන්ගේ නිහඬ රැකවරණය',
        summaryEn: 'Young village guards watch gently from afar without bright lights, cheering as the babies ride their first wave.',
        summarySi: 'වෙරළ රකින ගමේ තරුණ පිරිස නිහඬව සතුටින් බලා සිටිද්දී, පැටවු මුල්ම රළ සමඟ මුහුදට එක් වෙති.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'rek-4-1',
            'Standing quietly in the shadows, young village guards watched with soft smiles—keeping loud torches off so the babies would not get lost.',
            'සෙවණැලි අතර නිහඬව හිටපු ගමේ තරුණ ආරක්ෂකයෝ මෘදු හිනාවකින් බලා හිටියා—පැටවුන්ට පාර වරදින්නේ නැති වෙන්න විදුලි පන්දම් නිවාගෙන.',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-4-2',
            'Wave after wave lifted the tiny swimmers gently, carrying them safely into their wide ocean home.',
            'රළ පෙළින් රළ පෙළ පුංචි පිහිනුම්කරුවන් ආදරෙන් ඔසවාගෙන, ඔවුන්ගේ පුළුල් සාගර නිවහනට ආරක්ෂිතව අරගෙන ගියා.',
            TURTLE_REKAWA_VOCAB
          ),
          createSentence(
            'rek-4-3',
            'The guards whispered a quiet cheer under the stars—happy to keep Rekawa a gentle home for every sea turtle.',
            'තරු අහස යට හිඳිමින් ආරක්ෂකයෝ හෙමින් ජය ඝෝෂා කළා—සෑම කැස්බෑවෙකුටම රැකව වෙරළ ආදරණීය නිවහනක් කරන්න ලැබීම ගැන හරිම සතුටින්.',
            TURTLE_REKAWA_VOCAB
          ),
        ],
        keyVocabulary: [
          TURTLE_REKAWA_VOCAB.cheer,
        ],
        funFactEn: 'Five of the world’s seven sea turtle kinds come to Sri Lanka’s southern and eastern shores every year!',
        funFactSi: 'ලොව සිටින මුහුදු කැස්බෑ විශේෂ 7න් 5ක්ම බිත්තර දැමීමට ශ්‍රී ලංකාවේ වෙරළ තීරයන් වෙත පැමිණෙති.',
      },
    ],
    quiz: [
      {
        id: 'rek-q1',
        questionEn: 'Why did Maya return to Rekawa beach at midnight?',
        questionSi: 'මායා කැස්බෑ අම්මා මධ්‍යම රාත්‍රියේ රැකව වෙරළට නැවත ආවේ ඇයි?',
        options: [
          'She was looking for village food',
          'She returned to lay her eggs on the very beach where she was born',
          'She wanted to sleep on dry rocks',
          'She followed a big fishing ship',
        ],
        optionsSi: [
          'ගමෙන් කෑම සෙවීමට',
          'තමා උපන් වෙරළටම නැවත බිත්තර දැමීමට',
          'වියළි ගල් උඩ නිදා ගැනීමට',
          'ලොකු ධීවර නැවක් පසුපස ආ නිසා',
        ],
        correctIndex: 1,
        explanationSi: 'වසර තිහකට පෙර තමා උපන් වෙරළටම බිත්තර දැමීමට මායා ආපසු පැමිණියාය.',
      },
      {
        id: 'rek-q2',
        questionEn: 'What did Maya’s shiny white eggs look like?',
        questionSi: 'මායා දැමූ දිදුලන සුදු බිත්තර මොන වගේද?',
        options: [
          'Square pebbles',
          'Big coconuts',
          'Smooth ping-pong balls',
          'Green mangoes',
        ],
        optionsSi: [
          'හතරැස් ගල් කැට වගේ',
          'ලොකු පොල් ගෙඩි වගේ',
          'සුදු පිං-පොං බෝල වගේ',
          'අමු අඹ වගේ',
        ],
        correctIndex: 2,
        explanationSi: 'කැස්බෑ බිත්තර රවුම් හා සුදු පැහැති පිං-පොං බෝල වැනි හැඩයක් ගනී.',
      },
      {
        id: 'rek-q3',
        questionEn: 'How did the tiny baby turtles find the ocean at night?',
        questionSi: 'කුඩා කැස්බෑ පැටවුන් රාත්‍රියේදී මුහුද සොයා ගත්තේ කෙසේද?',
        options: [
          'By following the white shine of the moon on the sea water',
          'By following bright car headlights',
          'By calling out to Maya',
          'By smelling sweet cinnamon',
        ],
        optionsSi: [
          'මුහුදු වතුර මත බැබළෙන සුදු සඳ එළිය ඔස්සේ',
          'වාහනවල විදුලි පහන් පස්සේ',
          'මායාට කෑගසමින්',
          'කුරුඳු සුවඳ ඔස්සේ',
        ],
        correctIndex: 0,
        explanationSi: 'මුහුද මත වැටෙන ස්වභාවික සඳ එළිය ඔස්සේ පැටවු සාගරයට පිවිසෙති.',
      },
      {
        id: 'rek-q4',
        questionEn: 'Why did the village guards keep bright torches off on the beach?',
        questionSi: 'ගමේ ආරක්ෂකයෝ වෙරළේදී විදුලි පන්දම් නිවාගෙන සිටියේ ඇයි?',
        options: [
          'Because their batteries were dead',
          'So the baby turtles would follow the moonlight and not get lost',
          'Because they were playing hide-and-seek',
          'To catch fish in the sand',
        ],
        optionsSi: [
          'බැටරි ඉවර වූ නිසා',
          'පුංචි පැටවුන්ට පාර වරදින්නේ නැතිව සඳ එළියෙන් මුහුදට යෑමට',
          'හැංගිමුත්තන් සෙල්ලම් කිරීමට',
          'වැල්ලෙන් මාළු ඇල්ලීමට',
        ],
        correctIndex: 1,
        explanationSi: 'වෙනත් කෘත්‍රිම ආලෝකයන් තිබුණහොත් පැටවුන් මුහුදට යන පාර වරදවා ගන්නා නිසා ඔවුන් අඳුර රැකගත්හ.',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // Story 8: Heritage & Mystery — The Singing Clock of Galle Fort
  // --------------------------------------------------------------------------
  {
    id: 'secret-of-galle-clock-tower',
    categoryId: 'heritage',
    categoryTitleEn: '4. Heritage, History & Mystery',
    categoryTitleSi: 'උරුමය, ඉතිහාසය සහ අභිරහස්',
    titleEn: 'The Singing Clock of Galle Fort',
    titleSi: 'ගාලු කොටුවේ හඬ නඟන ඔරලෝසුව',
    level: 'Elementary (A2)',
    genreEn: 'Heritage, History & Mystery',
    genreSi: 'උරුමය, ඉතිහාසය සහ අභිරහස්',
    estimatedMinutes: 3,
    coverAccent: '#4f46e5',
    coverImage: galleClockTowerCover,
    theme: 'mystic',
    chapters: [
      {
        id: 'gal-ch1',
        chapterNumber: 1,
        titleEn: 'The Tall Stone Watchman',
        titleSi: 'ගල් පවුරේ උස් මුරකරුවා',
        subtitleEn: 'A four-faced clock beside the sea',
        subtitleSi: 'සයුර අද්දර ඇති පැරණි ඔරලෝසු කුලුන',
        summaryEn: 'Above the wide stone wall of Galle Fort stands an old clock tower watching fishing boats every hour.',
        summarySi: 'ගාලු කොටු පවුර මත නැඟී සිටින පැරණි ඔරලෝසු කුලුන සයුර දිහා බලමින් පැයෙන් පැය වේලාව කියයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'gal-1-1',
            'High on the wide stone wall of Galle Fort stands a tall old clock tower looking out over the blue sea.',
            'ගාලු කොටුවේ පළල් ගල් පවුර මත, නිල්වන් මුහුද දිහා බලාගෙන උස් පැරණි ඔරලෝසු කුලුනක් නැඟී සිටිනවා.',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-1-2',
            'Its four bright white faces have watched fishermen, kids flying kites, and sunny sunsets for more than a hundred years.',
            'එහි සුදු පැහැති මුහුණු හතර, අවුරුදු සියයකටත් වැඩි කාලයක් තිස්සේ ධීවරයන්, සරුංගල් අරින ළමුන් සහ සුන්දර සැන්දෑවන් දැකලා තියෙනවා.',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-1-3',
            'Down in the bay, old sailors call it their stone friend because its clear clock bell never misses an hour.',
            'වරායේ ඉන්න පැරණි නාවිකයෝ එයට "ගල් මිතුරා" කියලා කියන්නේ ඒ ඔරලෝසුවේ සීනු හඬ කිසිදාක වේලාව වරද්දන්නේ නැති නිසයි.',
            CLOCKTOWER_VOCAB
          ),
        ],
        keyVocabulary: [
          CLOCKTOWER_VOCAB.tower,
          CLOCKTOWER_VOCAB.clock,
        ],
        funFactEn: 'The Galle Fort Clock Tower was built in 1883 and has four clock faces pointing North, South, East, and West!',
        funFactSi: '1883 වසරේදී ඉදිකළ ගාලු කොටුවේ ඔරලෝසු කුලුනට දිශා හතරටම මුහුණලා ඇති ඔරලෝසු මුහුණු හතරක් තිබේ.',
      },
      {
        id: 'gal-ch2',
        chapterNumber: 2,
        titleEn: 'Up the Winding Stairs',
        titleSi: 'වටේට යන පඩිපෙළ දිගේ',
        subtitleEn: 'Cleaning heavy brass wheels',
        subtitleSi: 'බර පිත්තල දත් රෝදවලට තෙල් දැමීම',
        summaryEn: 'Young Ravi climbs the winding iron stairs with Uncle Perera to oil the brass wheels inside the living clock.',
        summarySi: 'පුංචි රවී පෙරේරා මාමා සමඟ කැරකෙන පඩිපෙළ නඟිමින් ඔරලෝසුව ඇතුළේ දත් රෝද පිරිසිදු කරයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'gal-2-1',
            'Every Sunday morning, twelve-year-old Ravi climbed the winding iron stairs with his Uncle Perera.',
            'හැම ඉරිදා උදේකම, දොළොස් හැවිරිදි රවී තමන්ගේ පෙරේරා මාමා එක්ක කැරකෙන යකඩ පඩිපෙළ දිගේ ඉහළට නැග්ගා.',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-2-2',
            'Inside the cool stone room, shining brass wheels turned together like magic—tick, tock, tick, tock!',
            'සිසිල් ගල් කාමරය ඇතුළේ දිදුලන පිත්තල දත් රෝද හරියට මායාවක් වගේ එකට කැරකුණා—ටික්, ටොක්, ටික්, ටොක්!',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-2-3',
            'Ravi wiped off sea salt with a soft cloth and gave each wheel two drops of oil so the clock stayed happy and steady.',
            'රවී මෘදු රෙදි කෑල්ලකින් මුහුදු ලුණු කුඩු පිහදා, ඔරලෝසුව සතුටින් වැඩ කරන්න හැම දත් රෝදයටම තෙල් බිංදු දෙක බැගින් දැම්මා.',
            CLOCKTOWER_VOCAB
          ),
        ],
        keyVocabulary: [
          CLOCKTOWER_VOCAB.stairs,
          CLOCKTOWER_VOCAB.wheels,
        ],
        funFactEn: 'Even today, the Galle Fort clock runs mechanically using weights and gears—not modern batteries!',
        funFactSi: 'මෙම පැරණි ඔරලෝසුව විදුලිය හෝ බැටරි නොමැතිව අදටත් ක්‍රියාත්මක වන්නේ පැරණි දත් රෝද බලයෙනි.',
      },
      {
        id: 'gal-ch3',
        chapterNumber: 3,
        titleEn: 'Lost in Thick Sea Fog',
        titleSi: 'ඝන මුහුදු මීදුමේ අතරමං වීම',
        subtitleEn: 'A musical bell calls boats home',
        subtitleSi: 'බෝට්ටුවලට මඟ පෙන්වූ සීනු හඬ',
        summaryEn: 'When thick gray sea fog hides the harbor rocks, the tower bell rings six clear chimes guiding every fishing boat home.',
        summarySi: 'මුහුදු මීදුමෙන් වරාය වැසී ගිය විට, කුලුනේ සීනුව හයේ හෝරාව නාද කර ධීවර බෝට්ටුවලට පාර පෙන්වයි.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'gal-3-1',
            'One cloudy evening, thick gray fog rolled fast over the water, hiding the rocky shore completely.',
            'වලාකුළු පිරි එක් හවසක, ඝන අළු පාට මීදුමක් වතුර උඩින් වේගයෙන් ඇවිත් ගල්පර ඇති වෙරළ තීරය සම්පූර්ණයෙන්ම වහගත්තා.',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-3-2',
            'Wooden fishing boats out on the waves could not see where the safe harbor mouth was!',
            'රළ අතරේ හිටපු ලී ධීවර බෝට්ටුවලට ආරක්ෂිත වරාය පිවිසුම කොහේද කියලා පෙනුණේ නැහැ!',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-3-3',
            'Then the clock struck six—DONG, DONG, DONG!—and the big brass bell began to ring with a clear golden echo across the fog.',
            'එතකොටම ඔරලෝසුව හයේ හෝරාව ගැහුවා—ඩොං, ඩොං, ඩොං!—මීදුම හරහා ලොකු පිත්තල සීනුව පැහැදිලි දෝංකාරයකින් නාද වෙන්න පටන් ගත්තා.',
            CLOCKTOWER_VOCAB
          ),
        ],
        keyVocabulary: [
          CLOCKTOWER_VOCAB.fog,
          CLOCKTOWER_VOCAB.shore,
          CLOCKTOWER_VOCAB.boats,
          CLOCKTOWER_VOCAB.bell,
          CLOCKTOWER_VOCAB.ring,
          CLOCKTOWER_VOCAB.echo,
        ],
        funFactEn: 'Sound travels far over flat ocean water — helping sailors hear bells or foghorns miles away!',
        funFactSi: 'සමතලා මුහුදු ජලය මතින් ශබ්දය බොහෝ දුර ගමන් කරන නිසා ධීවරයන්ට ඈත සිට පවා සීනු හඬ ඇසේ.',
      },
      {
        id: 'gal-ch4',
        chapterNumber: 4,
        titleEn: 'Lanterns by the Harbor',
        titleSi: 'වරායේ පත්තු වුණු ලන්තෑරුම්',
        subtitleEn: 'A living promise of care',
        subtitleSi: 'ඉතිහාසය රැකගැනීමේ ආදරණීය පොරොන්දුව',
        summaryEn: 'Following the clear bell sound, every boat steers safely into the calm harbor where warm tea and proud smiles await.',
        summarySi: 'පැහැදිලි සීනු හඬ ඔස්සේ සියලු බෝට්ටු වරායට පැමිණෙන අතර, අතීත උරුමය රැකීමේ සැබෑ අරුත රවී වටහා ගනී.',
        sceneType: 'none',
        sentences: [
          createSentence(
            'gal-4-1',
            'Following that familiar bell sound through the gray air, every boat turned past the sharp rocks into the calm harbor.',
            'අළු පාට මීදුම අතරින් ආපු ඒ හුරුපුරුදු සීනු හඬ පස්සේ ඇවිත්, හැම බෝට්ටුවක්ම තියුණු ගල්පර මඟහැරලා නිසල වරායට ආවා.',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-4-2',
            'Warm lanterns glowed on the beach as fishermen stepped ashore smiling and waving up toward the clock tower.',
            'ධීවරයන් හිනාවෙමින් ඔරලෝසු කුලුන දිහාට අත වනලා ගොඩට එද්දී, වෙරළේ උණුසුම් ලන්තෑරුම් දිලිසුණා.',
            CLOCKTOWER_VOCAB
          ),
          createSentence(
            'gal-4-3',
            'Ravi smiled at the shiny brass wheels beside him: when we care for old stone walls and bells, they still care for us in our own story today.',
            'රවී ළඟ තිබුණු දිදුලන පිත්තල රෝද දිහා බලලා හිනාවුණා: අපි පැරණි ගල් පවුරු සහ සීනු ආදරයෙන් රැකබලා ගත්තම, අද අපේ ජීවිත කතාවටත් ඒවා පිහිට වෙනවා.',
            CLOCKTOWER_VOCAB
          ),
        ],
        keyVocabulary: [
          CLOCKTOWER_VOCAB.harbor,
          CLOCKTOWER_VOCAB.story,
        ],
        funFactEn: 'Galle Fort has stood strong since the 1500s–1600s and is cared for today as a UNESCO World Heritage gem.',
        funFactSi: 'සියවස් ගණනක් පැරණි ගාලු කොටුව අද දකුණු ආසියාවේ වඩාත්ම සුරක්ෂිත ලෝක උරුම නගරයකි.',
      },
    ],
    quiz: [
      {
        id: 'gal-q1',
        questionEn: 'Where does the old clock tower stand in Galle?',
        questionSi: 'ගාල්ලේ පැරණි ඔරලෝසු කුලුන පිහිටා තිබෙන්නේ කොතැනද?',
        options: [
          'Deep inside a forest',
          'High on the wide stone wall of Galle Fort overlooking the sea',
          'Under the ocean waves',
          'Inside a school library',
        ],
        optionsSi: [
          'ඝන කැලෑවක් ඇතුළේ',
          'මුහුදට මුහුණලා ඇති ගාලු කොටුවේ පළල් ගල් පවුර මත',
          'මුහුදු රළ යට',
          'පාසල් පුස්තකාලයක් ඇතුළේ',
        ],
        correctIndex: 1,
        explanationSi: 'ඔරලෝසු කුලුන පිහිටා ඇත්තේ නිල් සයුර දෙස බලා සිටින ගාලු කොටු පවුර මතය.',
      },
      {
        id: 'gal-q2',
        questionEn: 'What did Ravi do inside the clock room every Sunday morning?',
        questionSi: 'රවී හැම ඉරිදා උදෑසනකම ඔරලෝසු කාමරය ඇතුළේ කළේ කුමක්ද?',
        options: [
          'He painted the walls green',
          'He wiped off sea salt and oiled the brass wheels',
          'He took out the big bell',
          'He slept on the stairs',
        ],
        optionsSi: [
          'බිත්තිවල කොළ පාට ගෑවා',
          'මුහුදු ලුණු පිස දමා පිත්තල දත් රෝදවලට තෙල් දැම්මා',
          'ලොකු සීනුව ගලවා ගත්තා',
          'පඩිපෙළේ නිදා ගත්තා',
        ],
        correctIndex: 1,
        explanationSi: 'ඔරලෝසුව හොඳින් ක්‍රියාත්මක වීමට රවී ලුණු කුඩු පිසදා දත් රෝදවලට තෙල් දැමුවේය.',
      },
      {
        id: 'gal-q3',
        questionEn: 'Why could the fishermen not see the safe harbor entrance that cloudy evening?',
        questionSi: 'එදා වලාකුළු පිරි හවසේ ධීවරයන්ට ආරක්ෂිත වරාය පිවිසුම නොපෙනුණේ ඇයි?',
        options: [
          'Because thick gray sea fog hid the rocky shore',
          'Because it was snowing',
          'Because they forgot their glasses',
          'Because the sea had dried up',
        ],
        optionsSi: [
          'ඝන අළු පාට මුහුදු මීදුමකින් වෙරළ තීරය වැසී ගිය නිසා',
          'හිම වැටුණු නිසා',
          'ඇස් කණ්ණාඩි අමතක වූ නිසා',
          'මුහුද සිඳී ගිය නිසා',
        ],
        correctIndex: 0,
        explanationSi: 'ඝන මුහුදු මීදුමක් වතුර මත පැතිරී ගල්පර සහිත වෙරළ සම්පූර්ණයෙන්ම වැසී ගියේය.',
      },
      {
        id: 'gal-q4',
        questionEn: 'How did the boats find their safe way into Galle harbor?',
        questionSi: 'ධීවර බෝට්ටු ආරක්ෂිතව ගාලු වරායට පාර සොයාගත්තේ කෙසේද?',
        options: [
          'By following big sea turtles',
          'By following the clear echo of the clock tower bell at six o’clock',
          'By waiting until next summer',
          'By blowing whistles into the wind',
        ],
        optionsSi: [
          'මුහුදු කැස්බෑවන් පසුපස ආ නිසා',
          'හයේ හෝරාවට නාද වූ ඔරලෝසු කුලුනේ පැහැදිලි සීනු දෝංකාරය ඔස්සේ',
          'ඊළඟ ගිම්හානය එනතුරු බලා සිටීමෙන්',
          'සුළඟට නළා පිඹීමෙන්',
        ],
        correctIndex: 1,
        explanationSi: 'මීදුම හරහා පැතිරුණු ඔරලෝසු සීනුවේ පැහැදිලි හඬ ඔස්සේ සියලු බෝට්ටු වරායට පැමිණියේය.',
      },
    ],
  },
];

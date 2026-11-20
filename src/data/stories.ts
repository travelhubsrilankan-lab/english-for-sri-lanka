import { Story } from '../types/story';
import lostBabyElephantCover from '../assets/images/lost_baby_elephant_1795103831203.jpg';
import magicMangoTreeCover from '../assets/images/magic_mango_tree_1795160766093.jpg';
import marieCurieCover from '../assets/images/marie_curie_science_1795161096213.jpg';

/**
 * Add new stories simply by appending objects to this array.
 * Audio narration, clickable vocabulary highlighting, level filters, quizzes,
 * search, favorites, and word practice games all work automatically.
 */
export const STORIES: Story[] = [
  {
    id: 'marie-curie-science',
    categoryId: 'inspiring-lives',
    title: 'Marie Curie: The Woman Who Loved Science',
    titleSi: 'මාරි කියුරි: විද්‍යාවට ආදරය කළ කාන්තාව',
    summarySi:
      'දුප්පත් දැරියක ලෙස පෝලන්තයේ උපත ලබා, නොපසුබට උත්සාහයෙන් නොබෙල් ත්‍යාග දෙකක් දිනා ලෝකය වෙනස් කළ මාරි කියුරිගේ ජීවිත කතාව.',
    level: 'Beginner',
    readingMinutes: 5,
    hasAudio: true,
    coverImage: marieCurieCover,
    paragraphs: [
      'Marie Curie was born in Poland in 1867. Her family called her Manya. Her father and mother were both teachers. There were five children in the family, and Manya was the youngest.',
      'Manya loved books. She read a lot, and she remembered everything. She was the best student in her school. Her teachers said, “This girl is very clever.”',
      'But Manya’s life was not easy. Her family did not have much money. When she was still a child, her mother and her sister died. Manya was very sad, but she kept studying.',
      'When she finished school, Manya wanted to go to university. But at that time, girls could not study at the university in her city. “I will find a way,” she thought.',
      'Her older sister, Bronya, also wanted to study. She wanted to be a doctor in Paris. They made a plan. Manya worked as a teacher in a house for many years and sent money to Bronya. Later, Bronya would help her too.',
      'At last, in 1891, Manya went to Paris. She was twenty-four years old. Now people called her Marie. She started to study science at the university.',
      'Marie was very poor in Paris. She lived in a tiny, cold room at the top of a house. Sometimes she only ate bread and tea. But she was happy. “I am learning,” she said.',
      'She studied very hard. After some years, she finished her studies in physics and mathematics. She was one of the best students.',
      'One day, Marie met a scientist called Pierre Curie. They talked for a long time about science. Pierre liked Marie very much, and Marie liked him too. In 1895, they got married.',
      'They had two daughters, Irène and Ève. Marie was a busy mother, but she never stopped her work. She and Pierre worked together every day.',
      'At that time, a scientist called Henri Becquerel found something strange in a black stone. The stone sent out invisible rays. Marie wanted to know more. “Where do these rays come from?” she asked.',
      'She did many experiments. Then she had a big idea. She thought, “There is something new in this stone. It is a new material!”',
      'Pierre was very interested. He stopped his own work to help Marie. They worked in an old, cold shed. It had a broken roof. It was hot in summer and very cold in winter.',
      'For years, they worked with tons of stone. It was hard and tiring work. Marie stirred the big pots every day with a long iron stick.',
      'In 1898, they found two new materials. Marie called the first one polonium, for her country, Poland. The second one was radium. Radium glowed a little in the dark. It looked like a small blue light. Marie loved to look at it at night.',
      'The world heard about the Curies. In 1903, Marie and Pierre won the Nobel Prize in Physics together with Henri Becquerel. Marie was the first woman to win a Nobel Prize.',
      'But in 1906, something terrible happened. Pierre died in an accident on a street in Paris. Marie was in great pain. For some days, she could not speak. But she did not stop. She took Pierre’s job at the university. She became the first woman professor there.',
      'In 1911, Marie won a second Nobel Prize, this time in Chemistry. She was the first person to win a Nobel Prize in two different sciences.',
      'When a big war started in Europe, Marie wanted to help. She knew that X-ray machines can show a broken bone. She made small X-ray cars and drove them to the hospitals near the war. These cars saved many soldiers. Her daughter Irène helped her.',
      'Marie worked with radium for many years. At that time, nobody knew that it could be dangerous. Marie became ill, and she died in 1934. But her work did not die. Doctors today still use her ideas to find and treat illness.',
      'Today, many schools, streets and hospitals around the world have the name “Curie”. Marie Curie started as a poor girl in a small country. But she worked hard, and she never gave up. She changed science, and she changed the world.',
    ],
    vocabulary: [
      {
        word: 'clever',
        sinhalaMeaning: 'බුද්ධිමත්',
        example: 'Her teachers said, “This girl is very clever.”',
      },
      {
        word: 'university',
        sinhalaMeaning: 'විශ්වවිද්‍යාලය',
        example: 'When she finished school, Manya wanted to go to university.',
      },
      {
        word: 'plan',
        sinhalaMeaning: 'සැලැස්ම',
        example: 'They made a plan.',
      },
      {
        word: 'experiment',
        sinhalaMeaning: 'පරීක්ෂණය',
        example: 'She did many experiments.',
      },
      {
        word: 'material',
        sinhalaMeaning: 'ද්‍රව්‍ය',
        example: 'It is a new material!',
      },
      {
        word: 'shed',
        sinhalaMeaning: 'කුඩා පැල් ගොඩනැගිල්ල',
        example: 'They worked in an old, cold shed.',
      },
      {
        word: 'glow',
        sinhalaMeaning: 'ආලෝකමත් වීම / දිලිසීම',
        example: 'Radium glowed a little in the dark.',
      },
      {
        word: 'Nobel Prize',
        sinhalaMeaning: 'නොබෙල් ත්‍යාගය',
        example: 'Marie was the first woman to win a Nobel Prize.',
      },
      {
        word: 'professor',
        sinhalaMeaning: 'මහාචාර්ය',
        example: 'She became the first woman professor there.',
      },
      {
        word: 'give up',
        sinhalaMeaning: 'අත්හැර දමනවා',
        example: 'But she worked hard, and she never gave up.',
      },
    ],
    quiz: [
      {
        question: 'Where was Marie Curie born?',
        options: ['France', 'Poland', 'Italy'],
        correctIndex: 1,
        explanation: 'මාරි කියුරි 1867 වසරේදී උපත ලැබුවේ පෝලන්තයේදී (Poland) ය.',
      },
      {
        question: 'Why did Marie go to Paris?',
        options: [
          'To study science at the university',
          'To visit a friend',
          'To become a singer',
        ],
        correctIndex: 0,
        explanation:
          'විශ්වවිද්‍යාලයේ විද්‍යාව හැදෑරීම සඳහා (To study science at the university) ඇය 1891 දී පැරිසියට ගියාය.',
      },
      {
        question: 'Where did Marie and Pierre work?',
        options: [
          'In a big, new school',
          'In an old, cold shed',
          'In a hospital',
        ],
        correctIndex: 1,
        explanation:
          'මාරි සහ පියරේ පරීක්ෂණ සිදු කළේ කැඩුණු වහලක් තිබූ පැරණි, සීතල පැල් ගොඩනැගිල්ලක (In an old, cold shed) ය.',
      },
      {
        question: 'What did Marie name the first new material, and why?',
        options: [
          'Radium, for her sister',
          'Polonium, for her country',
          'Polonium, for her husband',
        ],
        correctIndex: 1,
        explanation:
          'ඇය සොයාගත් පළමු නව මූලද්‍රව්‍යය ඇගේ මව් රට වන පෝලන්තය සිහිවීම සඳහා Polonium ලෙස නම් කළාය.',
      },
      {
        question: 'What did Marie do in the war?',
        options: [
          'She made X-ray cars for the hospitals',
          'She taught in a school',
          'She closed her laboratory',
        ],
        correctIndex: 0,
        explanation:
          'යුද්ධය අතරතුර තුවාල වූ සෙබළුන්ට ප්‍රතිකාර කිරීමට රෝහල් සඳහා ජංගම X-ray රථ (X-ray cars) නිපදවා ඇය විසින්ම පදවාගෙන ගියාය.',
      },
      {
        question: 'What did Marie win two times?',
        options: ['A new house', 'A Nobel Prize', 'A race'],
        correctIndex: 1,
        explanation:
          'විද්‍යා ක්ෂේත්‍ර දෙකකින් (භෞතික විද්‍යාව හා රසායන විද්‍යාව) නොබෙල් ත්‍යාග (A Nobel Prize) දෙකක් දිනූ ලොව පළමු පුද්ගලයා ඇයයි.',
      },
    ],
    moral: {
      messageEn: 'Work hard, stay curious, and never give up on your dreams.',
      messageSi: 'නොපසුබට උත්සාහයෙන් හා කැපවීමෙන් කටයුතු කළහොත් ඕනෑම බාධකයක් ජයගත හැක.',
      adviceSi: 'දුෂ්කරතා මැද වුවද ඉගෙනීම අත්නොහැර ඉදිරියට යාමෙන් මුළු ලෝකයටම සෙතක් සැලසිය හැකිය.',
    },
  },
  {
    id: 'the-magic-mango-tree',
    categoryId: 'folktales',
    title: 'The Magic Mango Tree',
    titleSi: 'මැජික් අඹ ගහ',
    summarySi:
      'තමා සතු අවසන් අඹ ගෙඩියත් බෙදා දුන් කරුණාවන්ත කසුන්ට වසර පුරාම පල දෙන මැජික් අඹ ගසක් හිමි වූ ජන කතාව.',
    level: 'Beginner',
    readingMinutes: 4,
    hasAudio: true,
    coverImage: magicMangoTreeCover,
    paragraphs: [
      'Long ago, a poor boy named Kasun lived in a small village with his grandmother. They had a little house and a garden. In the garden, there was one old mango tree.',
      'The tree was very old, and it gave only a few mangoes. Kasun and his grandmother ate them, and they shared the rest with their neighbours. They were poor, but they were happy.',
      'One hot afternoon, an old man came to the garden. He was tired and thirsty. His clothes were dirty. “Please, can I have some water?” he asked.',
      'Kasun ran into the house and brought a cup of cold water. The old man drank it slowly. “Thank you, my child,” he said. “Are you hungry? I have no food, but you look hungry too.”',
      'Kasun smiled. “We have one mango. Please, you take it.” He gave the old man the last ripe mango from the tree. The old man ate it and said, “This is the sweetest mango in the world.”',
      'Then he put his hand on the old tree. “You are a kind boy,” he said. “This tree will now give mangoes all year. But remember one thing: they are only for sharing.” After that, the old man walked away. Kasun looked again, but he was gone.',
      'The next morning, Kasun saw many ripe mangoes on the tree. They were big and yellow. The day after, there were more! Kasun and his grandmother could not believe their eyes.',
      'Kasun remembered the old man’s words. Every day, he took mangoes to the neighbours. He gave some to a sick woman, some to a poor family, and some to the school children.',
      'The village people were very happy. They said, “This is a magic tree!” and they brought rice and vegetables to Kasun’s house. Soon Kasun and his grandmother had enough food too.',
      'But there was a rich man in the village, named Mr. Perera. He was very greedy. He heard about the magic tree, and he was jealous. “A poor boy has a tree like that? That is not fair,” he said.',
      'One night, Mr. Perera went to Kasun’s garden alone. He took a big bag. “I will take all the mangoes and sell them in the town,” he thought. “Then I will be richer.”',
      'He climbed the tree and picked mango after mango. He filled his big bag. But when he came down, something strange happened. The mangoes in his bag became small, hard and sour.',
      'Mr. Perera was angry. He ate one, and his face became very sour too. He threw the bag away and ran home. The next day, the whole village laughed.',
      'The mango tree gave sweet fruit to Kasun for many years. Kasun always shared them with everyone. When he became a man, he planted many mango seeds in the village. Soon there were many mango trees, and nobody in the village was ever hungry.',
      'The people still tell this story today. They say, “Sweet things taste sweeter when we share them.”',
    ],
    vocabulary: [
      {
        word: 'poor',
        sinhalaMeaning: 'දුප්පත්',
        example: 'Long ago, a poor boy named Kasun lived in a small village with his grandmother.',
      },
      {
        word: 'garden',
        sinhalaMeaning: 'මල් / වත්ත',
        example: 'They had a little house and a garden.',
      },
      {
        word: 'thirsty',
        sinhalaMeaning: 'පිපාසයි',
        example: 'He was tired and thirsty.',
      },
      {
        word: 'ripe',
        sinhalaMeaning: 'ඉදුණු',
        example: 'He gave the old man the last ripe mango from the tree.',
      },
      {
        word: 'greedy',
        sinhalaMeaning: 'ලෝභී',
        example: 'He was very greedy.',
      },
      {
        word: 'jealous',
        sinhalaMeaning: 'ඊර්ෂ්‍යා කරන',
        example: 'He heard about the magic tree, and he was jealous.',
      },
      {
        word: 'sour',
        sinhalaMeaning: 'ඇඹුල්',
        example: 'The mangoes in his bag became small, hard and sour.',
      },
      {
        word: 'share',
        sinhalaMeaning: 'බෙදාගන්න',
        example: 'Sweet things taste sweeter when we share them.',
      },
    ],
    quiz: [
      {
        question: 'Who lived with Kasun?',
        options: ['His mother', 'His grandmother', 'His uncle'],
        correctIndex: 1,
        explanation: 'කසුන් කුඩා ගමක ජීවත් වූයේ ඔහුගේ ආච්චි (His grandmother) සමඟය.',
      },
      {
        question: 'What did Kasun give the old man?',
        options: ['Water and a mango', 'Rice and curry', 'Only a banana'],
        correctIndex: 0,
        explanation:
          'කසුන් මහලු මිනිසාට සිසිල් ජලය කෝප්පයක් සහ ගසේ තිබූ අවසන් ඉදුණු අඹ ගෙඩිය (Water and a mango) ලබා දුන්නේය.',
      },
      {
        question: 'What did the old man say about the mangoes?',
        options: [
          'They are only for sharing',
          'They are only for selling',
          'They are only for Kasun',
        ],
        correctIndex: 0,
        explanation:
          'මෙම අඹ ගෙඩි අන් අය සමඟ බෙදා ගැනීම සඳහා පමණක් බව (They are only for sharing) මහලු මිනිසා පැවසීය.',
      },
      {
        question: 'Why did Mr. Perera go to the garden at night?',
        options: ['To help Kasun', 'To take all the mangoes', 'To sleep'],
        correctIndex: 1,
        explanation:
          'සියලුම අඹ ගෙඩි කඩා නගරයේ විකිණීමට ගැනීම සඳහා (To take all the mangoes) ලෝභී පෙරේරා මහතා රාත්‍රියේ වත්තට ගියේය.',
      },
      {
        question: 'What happened to Mr. Perera’s mangoes?',
        options: [
          'They became sweeter',
          'They became small, hard and sour',
          'They disappeared at once',
        ],
        correctIndex: 1,
        explanation:
          'ඔහුගේ මල්ලේ තිබූ අඹ ගෙඩි කුඩා, තද සහ ඇඹුල් ඒවා බවට (They became small, hard and sour) පත් විය.',
      },
    ],
    moral: {
      messageEn: 'Sweet things taste sweeter when we share them.',
      messageSi: 'අප සතු දේ අන් අය සමඟ බෙදාගන්නා විට ජීවිතය තවත් මිහිරි වේ.',
      adviceSi: 'ලෝභකම හා ඊර්ෂ්‍යාව වෙනුවට කරුණාවෙන් බෙදාහදා ගැනීම සැමවිටම යහපත උදා කරයි.',
    },
  },
  {
    id: 'the-lost-baby-elephant',
    categoryId: 'nature',
    title: 'The Lost Baby Elephant',
    titleSi: 'අතරමං වූ අලි පැටියා',
    summarySi:
      'වනාන්තරය අසල වැසි දිනයක තුවාල වී අතරමං වූ අලි පැටියෙකු පරිස්සමින් ආරක්ෂා කර මව වෙත භාර දුන් රවීගේ කතාව.',
    level: 'Beginner',
    readingMinutes: 3,
    hasAudio: true,
    coverImage: lostBabyElephantCover,
    paragraphs: [
      'Ravi lived in a small village near a big forest. He was ten years old. Every morning, he walked to school along a quiet road.',
      'One rainy morning, Ravi heard a strange sound near the road. It was a soft, sad cry. He stopped and listened. “Who is there?” he asked.',
      'He went slowly behind some bushes. There was a baby elephant! It was very small and wet. It was alone. Its leg had a small cut.',
      'Ravi was afraid. He knew that big elephants can be dangerous. “Where is your mother?” he asked in a quiet voice. The baby elephant only cried.',
      'Ravi did not touch the baby. He ran home and called his father. “Father, come quickly! A baby elephant is hurt!”',
      'Father called the wildlife officers on the phone. Then he said, “Ravi, do not go near the baby. The mother elephant may come. We must wait for the officers.”',
      'They waited at a safe distance. After half an hour, two officers came in a jeep. One of them was a kind woman named Dr. Silva. She was an animal doctor.',
      'Dr. Silva gave the baby some milk and cleaned its leg. “He is not badly hurt,” she said. “He only needs rest. Now we must find his family.”',
      'The officers took the baby to a safe place at the edge of the forest. Then everyone went far away and watched quietly.',
      'Night came. The village was very quiet. Ravi could not sleep. He thought about the little elephant.',
      'Early the next morning, Ravi ran to the place. The baby elephant was gone! But there were big footprints in the mud. “His mother came!” said Ravi.',
      'Dr. Silva smiled. “Yes, she found him. You did a good thing, Ravi. You were careful, and you asked for help.”',
      'After that day, the villagers put up a small sign near the road. It said, “Elephants live here. Please drive slowly.” Every morning, Ravi walked to school and looked at the forest. He smiled. He knew the little elephant was safe with his mother.',
    ],
    paragraphsSi: [
      'රවී ජීවත් වූයේ විශාල වනාන්තරයක් අසල පිහිටි කුඩා ගමකය. ඔහුට වයස අවුරුදු දහයකි. සෑම උදෑසනකම ඔහු නිහඬ පාරක් දිගේ පාසලට ඇවිද ගියේය.',
      'එක් වැසි සහිත උදෑසනක, පාර අසලින් රවීට අමුතු හඬක් ඇසුණි. එය මෘදු, දුක්බර හැඬීමක් විය. ඔහු නතර වී සවන් දුන්නේය. “කවුද එතන?” ඔහු ඇසුවේය.',
      'ඔහු සෙමෙන් පඳුරු කිහිපයක් පිටුපසට ගියේය. එහි අලි පැටියෙක් සිටියේය! ඌ ඉතා කුඩා සහ තෙමී සිටියේය. ඌ තනිවම සිටියේය. උගේ කකුලේ කුඩා තුවාලයක් තිබුණි.',
      'රවී බිය විය. ලොකු අලි භයානක විය හැකි බව ඔහු දැන සිටියේය. “ඔයාගේ අම්මා කොහෙද?” ඔහු නිහඬ හඬින් ඇසුවේය. අලි පැටියා කළේ හැඬීම පමණි.',
      'රවී පැටියාව ස්පර්ශ කළේ නැත. ඔහු ගෙදර දුවගෙන ගොස් තාත්තාට කතා කළේය. “තාත්තේ, ඉක්මනට එන්න! අලි පැටියෙකුට තුවාල වෙලා!”',
      'තාත්තා දුරකථනයෙන් වනජීවී නිලධාරීන්ට කතා කළේය. ඉන්පසු ඔහු මෙසේ කීවේය, “රවී, පැටියා ළඟට යන්න එපා. අම්මා ඇතින්න එන්න පුළුවන්. අපි නිලධාරීන් එනකම් බලා සිටිය යුතුයි.”',
      'ඔවුහු ආරක්ෂිත දුරකින් බලා සිටියහ. පැය භාගයකට පසු නිලධාරීන් දෙදෙනෙක් ජීප් රථයකින් පැමිණියහ. ඔවුන්ගෙන් එක් අයෙක් වෛද්‍ය සිල්වා නම් කරුණාවන්ත කාන්තාවක් වූවාය. ඇය සත්ව වෛද්‍යවරියක් වූවාය.',
      'වෛද්‍ය සිල්වා පැටියාට කිරි ටිකක් දී උගේ කකුල පිරිසිදු කළාය. “ඌට බරපතල තුවාලයක් නෑ,” ඇය කීවාය. “ඌට අවශ්‍ය විවේකය විතරයි. දැන් අපි උගේ පවුල සොයාගත යුතුයි.”',
      'නිලධාරීන් පැටියාව වනාන්තරයේ අයිනේ ආරක්ෂිත ස්ථානයකට රැගෙන ගියහ. ඉන්පසු සියලු දෙනා ඈතට ගොස් නිහඬව බලා සිටියහ.',
      'රාත්‍රිය උදා විය. ගම ඉතා නිහඬ විය. රවීට නින්ද ගියේ නැත. ඔහු කුඩා අලි පැටියා ගැන සිතමින් සිටියේය.',
      'පසුදා පාන්දරින්ම රවී එම ස්ථානයට දුවගෙන ගියේය. අලි පැටියා එහි නොසිටියේය! නමුත් මඩේ විශාල පා සළකුණු තිබුණි. “උගේ අම්මා ඇවිත්!” රවී සතුටින් කීවේය.',
      'වෛද්‍ය සිල්වා සිනාසුණාය. “ඔව්, ඇය ඌව සොයාගත්තා. රවී, ඔයා හොඳ දෙයක් කළා. ඔයා පරිස්සම් වුණා, වගේම උදව් ඉල්ලුවා.”',
      'එදා සිට ගම්වාසීන් පාර අසල කුඩා පුවරුවක් සවි කළහ. එහි “මෙහි අලි ජීවත් වෙති. කරුණාකර සෙමෙන් රිය පදවන්න.” යනුවෙන් සඳහන් විය. සෑම උදෑසනකම රවී පාසලට යන විට වනාන්තරය දෙස බැලුවේය. ඔහු සිනාසුණේය. කුඩා අලි පැටියා මව සමඟ ආරක්ෂිතව සිටින බව ඔහු දැන සිටියේය.',
    ],
    vocabulary: [
      {
        word: 'village',
        sinhalaMeaning: 'ගම',
        example: 'Ravi lived in a small village near a big forest.',
      },
      {
        word: 'forest',
        sinhalaMeaning: 'වනාන්තරය',
        example: 'The officers took the baby to a safe place at the edge of the forest.',
      },
      {
        word: 'cry',
        sinhalaMeaning: 'අඬනවා / හඬ',
        example: 'It was a soft, sad cry.',
      },
      {
        word: 'alone',
        sinhalaMeaning: 'තනිව',
        example: 'It was very small and wet. It was alone.',
      },
      {
        word: 'hurt',
        sinhalaMeaning: 'තුවාල වූ',
        example: 'Father, come quickly! A baby elephant is hurt!',
      },
      {
        word: 'wildlife officer',
        sinhalaMeaning: 'වනජීවී නිලධාරියා',
        example: 'Father called the wildlife officers on the phone.',
      },
      {
        word: 'safe',
        sinhalaMeaning: 'ආරක්ෂිත',
        example: 'They waited at a safe distance.',
      },
      {
        word: 'footprints',
        sinhalaMeaning: 'පා සළකුණු',
        example: 'But there were big footprints in the mud.',
      },
    ],
    quiz: [
      {
        question: 'What did Ravi hear near the road?',
        options: ['A soft, sad cry', 'A loud bus', 'A dog barking'],
        correctIndex: 0,
        explanation: 'වැසි උදෑසනක පාර අසලින් රවීට මෘදු, දුක්බර හඬක් (A soft, sad cry) ඇසුණි.',
      },
      {
        question: 'What was wrong with the baby elephant?',
        options: ['It was hungry only', 'Its leg had a small cut', 'It was sleeping'],
        correctIndex: 1,
        explanation: 'අලි පැටියාගේ කකුලේ කුඩා තුවාලයක් (Its leg had a small cut) තිබුණි.',
      },
      {
        question: 'Why did Father tell Ravi not to go near the baby?',
        options: ['The mother elephant may come', 'The road was wet', 'It was late'],
        correctIndex: 0,
        explanation:
          'මව් ඇතින්න පැමිණිය හැකි බැවින් (The mother elephant may come) අලි පැටියා ළඟට නොයන ලෙස තාත්තා පැවසීය.',
      },
      {
        question: 'How did Ravi know the mother came?',
        options: [
          'He saw her',
          'He saw big footprints in the mud',
          'Dr. Silva told him first',
        ],
        correctIndex: 1,
        explanation:
          'මඩේ තිබූ විශාල පා සළකුණු (big footprints in the mud) දැකීමෙන් අම්මා පැමිණි බව රවී දැනගත්තේය.',
      },
      {
        question: 'What did the villagers put near the road?',
        options: ['A new school', 'A small sign', 'A bus stop'],
        correctIndex: 1,
        explanation:
          'වාහන සෙමෙන් පදවන ලෙස දන්වන කුඩා පුවරුවක් (A small sign) ගම්වාසීන් පාර අසල සවි කළහ.',
      },
    ],
    moral: {
      messageEn: 'Be kind to animals, keep a safe distance, and ask trusted adults for help.',
      messageSi: 'සතුන්ට කරුණාවන්ත වන්න; අවදානම් අවස්ථාවලදී ආරක්ෂිතව සිට වැඩිහිටියන්ගෙන් උදව් ඉල්ලන්න.',
      adviceSi: 'වන සතුන් දුටු විට තනිවම ළඟට නොගොස් වනජීවී නිලධාරීන්ට දැනුම් දීම සැමවිටම ආරක්ෂිත වේ.',
    },
  },
];


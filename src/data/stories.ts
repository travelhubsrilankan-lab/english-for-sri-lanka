import { Story } from '../types/story';

/**
 * Add new stories simply by appending objects to this array.
 * Audio narration, clickable vocabulary highlighting, level filters, quizzes,
 * search, favorites, and word practice games all work automatically.
 *
 * Example object:
 * {
 *   id: 'thomas-edison-light',
 *   categoryId: 'inspiring-lives',
 *   title: 'The Boy Who Chased Light',
 *   titleSi: 'ආලෝකය සොයා ගිය දරුවා',
 *   summarySi: 'තෝමස් එඩිසන් කුඩා කල සිටම කුතුහලයෙන් ලෝකය වෙනස් කළ ආකාරය.',
 *   level: 'Beginner',
 *   readingMinutes: 3,
 *   hasAudio: true,
 *   coverImage: 'https://...',
 *   paragraphs: [
 *     'Young Thomas loved to ask curious questions about everything around him.',
 *     'After many patient experiments, his bright bulb finally lit the night.'
 *   ],
 *   vocabulary: [
 *     {
 *       word: 'curious',
 *       sinhalaMeaning: 'කුතුහලයෙන් පිරුණු',
 *       example: 'Young Thomas loved to ask curious questions.'
 *     },
 *     {
 *       word: 'experiment',
 *       sinhalaMeaning: 'පරීක්ෂණය',
 *       example: 'Each experiment taught him a valuable lesson.'
 *     }
 *   ],
 *   quiz: [
 *     {
 *       question: 'What did Thomas love to ask?',
 *       options: ['Curious questions', 'Money', 'Games'],
 *       correctIndex: 0,
 *       explanation: 'තෝමස් සැමවිටම කුතුහලයෙන් ප්‍රශ්න ඇසීමට ප්‍රිය කළේය.'
 *     }
 *   ]
 * }
 */
export const STORIES: Story[] = [];

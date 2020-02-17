import * as express from 'express';
const router = express.Router();
import { WordsDictionaryController } from './services/words-dictionary/words-dictionary.controller';

router.post('/api/find-replaceable-words', WordsDictionaryController.replaceMisspelledWords);

export default router;
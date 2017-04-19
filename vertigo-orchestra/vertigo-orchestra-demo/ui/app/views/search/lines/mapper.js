import DefaultLine from './line';
import ProcessLine from './process';

//TODO : à revoir avec Nicolas et Pierre
export default function lineComponentMapper(groupKey, list) {
    switch (groupKey) {
        //case 'Movies': return MovieLine;
        case 'processus': return ProcessLine;

        default: return DefaultLine;
    }
}

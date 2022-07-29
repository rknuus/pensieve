// TODO(KNR): a helper accessing Box and Stack is bad
import { boxes } from '../Box/box-store.js';
import { stacks } from '../Stack/stack-store.js';

export function getStore(name) {
    if (name === 'box') {
        return boxes;
    } else if (name === 'stack') {
        return stacks;
    }
    console.assert(false, name + ' is no valid store type');
    return undefined;
}
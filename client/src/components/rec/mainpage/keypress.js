import { useEffect } from 'react';
// JSDoc stuff
export default function useKeypress(key, action) {
    useEffect(() => {
        function onKeyup(e) {
          if (e.key === key) action()
        }
        window.addEventListener('keyup', onKeyup);
        return () => window.removeEventListener('keyup', onKeyup);
      }, []);
}
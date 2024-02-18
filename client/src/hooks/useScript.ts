import { useEffect } from 'react';

const useScript = (url: string, opts: { module?: boolean } | undefined) => {

    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = true;

        if (opts && opts.module) {
            script.type = 'module';
        }

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

export default useScript;

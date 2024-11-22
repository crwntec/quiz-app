import Image from "next/image";
import { useState } from "react";

export default function ImageComponent({ image, width, height }) {
    const [loading, setLoading] = useState(true);

    const loadImage = ({ src  }) => {
        return src;
    };

    return (
        <div>
            {loading && <span className="loading loading-spinner loading-lg"></span>}
            <Image
                loader={loadImage}
                className="rounded-lg"
                src={image}
                onLoad={() => setLoading(false)}
                style={{ display: loading ? 'none' : 'block' }}
                priority
                width={width}
                height={height}
                alt="Question Image. If you can't see this you are stupid and/or blind"
            />
        </div>
    );
}
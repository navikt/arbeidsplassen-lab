import styles from "./LabBadge.module.css";

function LabBadge() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="820"
            height="320"
            viewBox="0 0 820 320"
            fill="none"
            role="img"
            aria-labelledby="lab-badge-title"
            className={styles.badge}
        >
            <title id="lab-badge-title">LAB</title>

            <defs>
                <linearGradient id="badge-fill" x1="410" y1="5" x2="410" y2="315" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#FFF9ED" />
                    <stop offset="0.55" stopColor="#FFF8E9" />
                    <stop offset="1" stopColor="#FFF6E2" />
                </linearGradient>
            </defs>

            <rect
                x="5"
                y="5"
                width="810"
                height="310"
                rx="155"
                fill="url(#badge-fill)"
                stroke="#FBC35D"
                strokeWidth="10"
            />

            <g fill="none" stroke="#EEAA24" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
                <path d="M160 66 H225" />
                <path
                    d="
        M169 68
        V111
        L108 230
        C100 247 111 261 129 261
        H256
        C274 261 285 247 277 230
        L216 111
        V68
      "
                />
            </g>

            <path
                d="
      M161 165
      H224
      L258 226
      C263 235 257 241 248 241
      H137
      C128 241 122 235 127 226
      Z
    "
                fill="#F2AD23"
            />

            <circle cx="179" cy="202" r="11" fill="#FFF9ED" />
            <circle cx="206" cy="185" r="6" fill="#FFF9ED" />
            <circle cx="203" cy="218" r="5" fill="#FFF9ED" />

            <g fill="#252525">
                <path d="M137 0V1409H432V228H1188V0Z" transform="translate(346.900 235.000) scale(0.08820 -0.09156)" />
                <path
                    d="M1133 0 1008 360H471L346 0H51L565 1409H913L1425 0ZM942 582 803 987 739 1192Q723 1134 709.0 1088.0Q695 1042 537 582Z"
                    transform="translate(457.238 235.000) scale(0.08820 -0.09156)"
                />
                <path
                    d="M1386 402Q1386 210 1242.0 105.0Q1098 0 842 0H137V1409H782Q1040 1409 1172.5 1319.5Q1305 1230 1305 1055Q1305 935 1238.5 852.5Q1172 770 1036 741Q1207 721 1296.5 633.5Q1386 546 1386 402ZM1090 425Q1090 623 806 623H432V219H817Q959 219 1024.5 270.5Q1090 322 1090 425ZM1008 1015Q1008 1110 947.5 1150.0Q887 1190 768 1190H432V841H770Q895 841 951.5 884.5Q1008 928 1008 1015Z"
                    transform="translate(587.686 235.000) scale(0.08820 -0.09156)"
                />
            </g>
        </svg>
    );
}

export default LabBadge;

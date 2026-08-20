import styles from "./PictureFrame.module.css";

export default function PictureFrame() {
  return (
    <div className={styles.stage}>
      <div className={styles.castShadow} />
      <div className={styles.nail} />
      <div className={styles.swingRig}>
        <div className={styles.twistRig}>
          <div className={styles.wire}>
            <svg width="143" height="85" viewBox="0 0 143 85">
              <line x1="71.5" y1="0" x2="19.5" y2="85" stroke="#555" strokeWidth="1" />
              <line x1="71.5" y1="0" x2="123.5" y2="85" stroke="#555" strokeWidth="1" />
            </svg>
          </div>
          <div className={styles.frame}>
            {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
            <img src="/portrait.jpg" alt="Isaac Popov" className={styles.photo} />
            <div className={styles.glare} />
          </div>
        </div>
      </div>
    </div>
  );
}

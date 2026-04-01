import styles from "./inspector.module.css";

export default function PanelShell({ title, badge, children }) {
  return (
    <section className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>{title}</span>

        {badge !== undefined ? (
          <span className={styles.panelBadge}>{badge}</span>
        ) : null}
      </div>

      <div className={styles.panelBody}>{children}</div>
    </section>
  );
}

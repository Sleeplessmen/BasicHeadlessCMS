import styles from './PagePreviewButton.module.css';

export default function PagePreviewButton({ config }) {
    const handlePreview = () => {
        // TODO: Mở modal hoặc navigate để xem trước
        alert('Preview sẽ hiển thị ở đây.');
    };

    return (
        <button onClick={handlePreview} className={styles.previewButton}>
            Xem trước
        </button>
    );
}

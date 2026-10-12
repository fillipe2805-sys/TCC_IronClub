import styles from "../styles/Layout.module.css";

function PageInfo({ title, descricao }) {
    return (
        <header className={styles.cabecalho}>
            <div>
                <h1>{title}</h1>
                {descricao && <p>{descricao}</p>}
            </div>
        </header>
    );
}

export default PageInfo;
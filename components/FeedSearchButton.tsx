import { FC } from "react"
import { IconSearch } from "./Icons"
import styles from "./FeedSearchButton.module.css"
import classNames from "classnames"


export const FeedSearchButton: FC = () => {
    return (
        <div className={styles.FeedSearchButtonContainer}>
            <div className={styles.FeedSearchButtonContent}>
                <div>
                    <IconSearch />
                </div>
                <div className={classNames(styles.label, "h5-bold")}>
                    Find a campsite
                </div>
                <div className={styles.FilterButton}>
                    <IconSearch />
                </div>
            </div>
        </div>
    )
}
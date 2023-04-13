import classNames from "classnames";
import { PageTransition } from "./PageTransition";

export const Container: React.FC<{
  children: JSX.Element;
  scroll?: boolean;
  fullscreen?: boolean;
  flush?: boolean;
}> = ({ children, scroll = false, fullscreen = false, flush = false }) => {
  return (
    <PageTransition>
      <div className={classNames("innerContent", scroll && "scrollContent")}>
        {children}
      </div>
    </PageTransition>
  );
};

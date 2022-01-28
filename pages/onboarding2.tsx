import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Widget } from "@typeform/embed-react/build";
import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { User } from "../interfaces/types";

type UserProps = {
  user: User;
};

const Onboarding2 = ({ user }: UserProps) => {
  const { isLoading, error } = useUser();

  if (error) {
    console.log(error);
  }

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Viv Onboarding 2 of 2: Your stats and measurements</title>
          <meta
            name="description"
            content="In this last, short section, you'll tell VIV some vital statistics and measurements, so we can quantify the goals of the program for you."
          />
        </Head>

        <main className={styles.main}>
          <Widget
            id="pKs0TbIl"
            chat
            style={{ width: "100%", height: "100%" }}
            hidden={{ email: user.email, auth_id: user.sub }}
          />
        </main>
      </div>
    );
  }
};

export default Onboarding2;

export const getServerSideProps = withPageAuthRequired();

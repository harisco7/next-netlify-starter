import React, { useState, useEffect, useMemo } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
  Button,
  Typography,
  Pagination,
} from "@mui/material";
import { Attachment } from "@material-ui/icons";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { User } from "../interfaces/types";
import { getawa } from "../utils/api";
import moment from "moment";

type UserProps = {
  user: User;
  token: string;
};

const Home = ({ user, token }: UserProps) => {
  const [notes, setNotes] = useState<any>([]);
  const [page, setPage] = useState(1);
  const { isLoading, error } = useUser();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(({ replied, ...props }: any) => (
    <TableRow replied={replied} {...props} />
  ))(({ theme, replied }: any) => ({
    backgroundColor: replied
      ? theme.palette.action.hover
      : theme.palette.common.white,
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const noteList = useMemo(() => {
    return notes.slice((page - 1) * 10, page * 10);
  }, [notes, page]);

  if (error) {
    console.log(error);
  }

  console.log(user);

  useEffect(() => {
    if (user.sub && token) {
      // getAnnotation("email|607dce353824a2f3570e6287", token)
      //   .then((res) => {
      //     setNotes(res.data);
      //   })
      //   .catch((err) => console.log(err));

      getawa(token)
        .then((res) => setNotes(res.data.result))
        .catch((err) => console.log(err));
      setPage(1);
    }
  }, [user, token]);

  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && user) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Viv Onboarding 1 of 2: Health and history</title>
          <meta
            name="description"
            content="First, we'll ask a few questions about your history, health, lifestyle and habits."
          />
        </Head>

        <main className={styles.main}>
          <TableContainer component={Paper} className={styles.table}>
            <Typography variant="h3" component="h3" className={styles.title}>
              Notes Lists
            </Typography>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell width="4%">ID</StyledTableCell>
                  <StyledTableCell width="8%">Position</StyledTableCell>
                  <StyledTableCell width="10%">Owned by</StyledTableCell>
                  <StyledTableCell width="25%">
                    Annotation title
                  </StyledTableCell>
                  <StyledTableCell width="8%">Date</StyledTableCell>
                  <StyledTableCell width="40%">Last Comment</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {noteList.map((note: any) => (
                  <StyledTableRow key={note.id} replied={note.replied > 0}>
                    <StyledTableCell>{note.annotation_id}</StyledTableCell>
                    <StyledTableCell>
                      {moment(new Date(note.annotation_position)).format(
                        "HH:mm, MM/DD"
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{note.owned_by_name}</StyledTableCell>
                    <StyledTableCell>{note.annotation_title}</StyledTableCell>
                    <StyledTableCell>
                      {moment(new Date(note.comment_created_date)).format(
                        "HH:mm, MM/DD"
                      )}
                    </StyledTableCell>
                    <StyledTableCell>{note.comment_text}</StyledTableCell>
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        href={`co.viv.vivadmin:////openuser?user_id=${note.auth_id}&noteid=${note.annotation_id}`}
                      >
                        <Attachment />
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                {notes.length === 0 && (
                  <TableRow>
                    <StyledTableCell
                      colSpan={7}
                      style={{ textAlign: "center" }}
                    >
                      There is no data
                    </StyledTableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {notes.length > 0 && (
            <Pagination
              count={
                Math.floor(notes.length / 10) +
                (notes.length % 10 === 0 ? 0 : 1)
              }
              variant="outlined"
              color="primary"
              shape="rounded"
              onChange={(e, pageNum) => setPage(pageNum)}
              className={styles.pagination}
            ></Pagination>
          )}
        </main>
      </div>
    );
  }
};

export default Home;

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context) => {
    const ses = await getSession(context.req, context.res);
    return {
      props: {
        token: ses?.accessToken,
      },
    };
  },
});

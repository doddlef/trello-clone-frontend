import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import {createBoard, type CreateBoardParams} from "@/actions/boards.ts";
import {Controller, useForm} from "react-hook-form";
import {useMutation} from "@tanstack/react-query";
import {ResponseCode} from "@/actions/response.ts";
import useBoardList from "@/store/useBoardList.ts";
import {useNavigate} from "react-router";
import * as React from "react";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const defaultValues: CreateBoardParams = {
    title: "",
    description: "",
}

function CreateBoard() {
    const { handleSubmit, control } = useForm({ defaultValues });
    const { list, setList } = useBoardList();
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();

    const { mutate, isPending } = useMutation({
        mutationKey: ["create-board"],
        mutationFn: createBoard,
        onSuccess: (res) => {
            if (res.code === ResponseCode.SUCCESS && res.data?.board) {
                setError(null);
                // TODO: update board list
                navigate(`/board/${res.data.board.boardId}`)
            } else {
                console.error(res.message);
                setError(res.message || "Something went wrong");
            }
        },
        onError: (err) => {
            console.error("fail to create board", err);
            setError("Something went wrong");
        }
    });

    const onSubmit = (data: CreateBoardParams) => mutate(data)

    return (
        <Container
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={2}
                sx={{
                    padding: 2,
                    borderRadius: 2,
                    minWidth: 400,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
                component={"form"}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Typography
                    textAlign={"center"}
                    variant={"h6"}
                    color={"info"}
                    fontWeight={"bold"}
                >
                    Create Board
                </Typography>
                {error && (
                    <motion.div
                        className={"w-full overflow-hidden"}
                        initial={{
                            height: 0,
                        }}
                        animate={{
                            height: "fit-content",
                        }}
                    >
                        <Alert severity={"error"} className={"w-full"}>
                            {error}
                        </Alert>
                    </motion.div>
                )}
                <Controller
                    name={"title"}
                    control={control}
                    rules={{ required: true }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                             }) => (
                        <TextField
                            helperText={error ? error.message : null}
                            required
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            fullWidth
                            label={"board title"}
                            type={"text"}
                            placeholder={"board title"}
                            variant={"filled"}
                        />
                    )}
                />
                <Typography variant={"body2"} color={"textSecondary"} textAlign={"start"}>
                    brief description about the board
                </Typography>
                <Controller
                    name={"description"}
                    control={control}
                    render={({
                                 field: { onChange, value },
                                 fieldState: { error },
                             }) => (
                        <TextField
                            helperText={error ? error.message : null}
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            fullWidth
                            label={"brief description"}
                            type={"text"}
                            placeholder={"description"}
                            variant={"filled"}
                        />
                    )}
                />
                <Button
                    variant={"contained"}
                    type={"submit"}
                    color={"info"}
                    loading={isPending}
                >
                    Create
                </Button>
            </Paper>
        </Container>
    )
}

export default CreateBoard;
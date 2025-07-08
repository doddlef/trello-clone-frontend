import Paper from "@mui/material/Paper";
import {emailPasswordAuth, type EmailPasswordAuthParams} from "@/actions/user.ts";
import {Controller, useForm} from "react-hook-form";
import * as React from "react";
import {Link, useNavigate} from "react-router";
import useAccount from "@/store/useAccount.ts";
import {useMutation} from "@tanstack/react-query";
import {ResponseCode} from "@/actions/response.ts";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import Alert from "@mui/material/Alert";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
    return (
        <div className={"w-full h-full flex justify-center items-center"}>
            <Paper
                elevation={2}
                className={"border-gray-300 dark:border-gray-600"}
                sx={{
                    padding: "8px 12px",
                    borderRadius: 2,
                    borderWidth: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                    width: 380,
                }}
            >
                <Typography
                    variant={"h5"}
                    color={"primary"}
                    fontFamily={"Sour Gummy"}
                >
                    TaskBoard
                </Typography>
                <Divider flexItem />
                <Button color={"info"} variant={"contained"} className={"w-full"} startIcon={<GitHubIcon />}>
                    Continue with GitHub
                </Button>
                <Button color={"info"} variant={"contained"} className={"w-full"} startIcon={<GoogleIcon />}>
                    Continue with Google
                </Button>
                <Divider variant={"middle"} flexItem>
                    <Typography variant={"caption"}>OR</Typography>
                </Divider>
                <LoginForm />
            </Paper>
        </div>
    )
}

const defaultValues: EmailPasswordAuthParams = {
    email: "",
    password: "",
}

function LoginForm() {
    const { handleSubmit, control } = useForm({ defaultValues });
    const [ error, setError ] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const { setAccount } = useAccount();

    const { mutate } = useMutation({
        mutationFn: emailPasswordAuth,
        onSuccess: (res) => {
            if (res.code === ResponseCode.SUCCESS && res.data) {
                setAccount(res.data.account);
                navigate("/dashboard");
            } else if (res.code === ResponseCode.EMAIL_NOT_VERIFIED) {
                console.log("email not verified");
                setError("email not verified")
                // TODO: handle email not verified
            } else if (res.code === ResponseCode.BAD_CREDENTIALS) {
                setError("Email or password is incorrect.");
            } else {
                setError(res.message || "Login failed. Please try again.");
            }
        },
        onError: (err) => {
            console.error("Login failed:", err);
            setError("Login failed. Please try again later.");
        }
    });

    const onSubmit = (data: EmailPasswordAuthParams) => mutate(data)

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"w-full flex flex-col items-center gap-2"}
        >
            { error && (
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
                name={"email"}
                control={control}
                rules={{ required: "Email cannot be empty" }}
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
                        label={"Email"}
                        type={"email"}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position={"start"}>
                                        <EmailOutlinedIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder={"email"}
                    />
                )}
            />
            <Controller
                name={'password'}
                control={control}
                rules={{ required: true }}
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
                        label={"Password"}
                        type={"password"}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position={"start"}>
                                        <PasswordIcon />
                                    </InputAdornment>
                                )
                            }
                        }}
                        placeholder={"password"}
                    />
                )}
            />
            <div className={"w-full flex flex-row justify-between"}>
                <Link to={"/"}>
                    <Typography variant={"body2"} color={"secondary"} className={"underline"}>
                        forgot password?
                    </Typography>
                </Link>
                <Link to={"/sign-up"}>
                    <Typography variant={"body2"} color={"secondary"} className={"underline"}>
                        sign up
                    </Typography>
                </Link>
            </div>
            <Button fullWidth type={"submit"}>
                Log in
            </Button>
        </form>

    )
}

export default Login
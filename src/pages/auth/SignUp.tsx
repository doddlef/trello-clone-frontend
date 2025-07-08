import {emailPasswordRegister, type EmailPasswordRegisterParams} from "@/actions/user.ts";
import {Controller, useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router";
import * as React from "react";
import {useMutation} from "@tanstack/react-query";
import {ResponseCode} from "@/actions/response.ts";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PasswordIcon from '@mui/icons-material/Password';
import FaceIcon from '@mui/icons-material/Face';
import Button from "@mui/material/Button";
import AuthFormLayout from "@/layouts/AuthFormLayout.tsx";
import Divider from "@mui/material/Divider";

const defaultValues: EmailPasswordRegisterParams = {
    email: "",
    password: "",
    nickname: "",
}

function SignUp() {
    const { handleSubmit, control } = useForm({ defaultValues });
    const navigate = useNavigate();
    const [ error, setError ] = React.useState<string | null>(null);

    const { mutate, isPending } = useMutation({
        mutationFn: emailPasswordRegister,
        onSuccess: (res) => {
            if (res.code === ResponseCode.SUCCESS && res.data) {
                navigate("/sign-up/success?accountUid=" + res.data.uid, { replace: true });
            } else {
                setError(res.message || "Registration failed. Please try again later.");
                console.error(res.message);
            }
        },
        onError: (error) => {
            setError("Registration failed. Please try again later.");
            console.error("Registration failed:", error);
        },
    });

    const onSubmit = (data: EmailPasswordRegisterParams) => mutate(data)

    return (
        <AuthFormLayout>
            <Typography variant={"h6"} color={"primary"} fontFamily={"Sour Gummy"}>
                Sign up
            </Typography>
            <Divider flexItem />
            <form onSubmit={handleSubmit(onSubmit)} className={"w-full flex flex-col items-center gap-6"}>
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
                            label={"email"}
                            type={"email"}
                            fullWidth
                            placeholder={"email"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position={"start"}>
                                            <EmailOutlinedIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    name={"password"}
                    control={control}
                    rules={{
                        required: true,
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                            message: "Password must be at least 8 characters, include a letter and a number."
                        }}}
                    render={({
                                 field: { onChange, value },
                                 fieldState: { error },
                             }) => (
                        <TextField
                            helperText={error ? error.message : null}
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            label={"password"}
                            type={"password"}
                            fullWidth
                            placeholder={"password"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position={"start"}>
                                            <PasswordIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
                <Controller
                    name={"nickname"}
                    control={control}
                    rules={{ required: true}}
                    render={({
                                 field: { onChange, value },
                                 fieldState: { error },
                             }) => (
                        <TextField
                            helperText={error ? error.message : null}
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            label={"nickname"}
                            type={"text"}
                            fullWidth
                            placeholder={"nickname"}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position={"start"}>
                                            <FaceIcon />
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    )}
                />
                <div className={"w-full flex flex-row justify-end"}>
                    <Link to={"/login"}>
                        <Typography variant={"body2"} color={"secondary"} className={"underline"}>
                            Already have an account?
                        </Typography>
                    </Link>
                </div>
                <Button type={"submit"} fullWidth loading={isPending} variant={"outlined"}>
                    Sign Up
                </Button>
            </form>
        </AuthFormLayout>
    )
}

export default SignUp
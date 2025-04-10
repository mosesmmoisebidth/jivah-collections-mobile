import {
    SafeAreaView,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { OutfitBold, OutfitSemibold, OutfitText } from "@/components/StyledText";
import { OtpInput } from "react-native-otp-entry";
import { router, useLocalSearchParams } from "expo-router";
import AuthService from "@/services/api/auth";

const VerifyOTP = () => {
    const { email } = useLocalSearchParams<{ email: string }>()
    const [otp, setOtp] = useState("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);

    const validateOTP = (): boolean => {
        if (!otp.trim()) {
            setError("OTP is required.");
            return false;
        }
        if (!/^\d{6}$/.test(otp)) {
            setError("Enter a valid 6-digit OTP.");
            return false;
        }
        setError(undefined);
        return true;
    };

    const handleVerifyOTP = async () => {
        if (!validateOTP()) return;
        setIsLoading(true);

        await AuthService.verifyResetPasswod(otp, () => {
            router.push("/(auth)/reset-password");
        });

        setIsLoading(false);
    };

    const handleResendOTP = async () => {
        setIsResending(true);
        await AuthService.requestResetPassword(email, () => {
            setOtp("")
        });
        setIsResending(false);
    };

    return (
        <ScrollView>
            <SafeAreaView>
                <View style={tw`flex-col gap-5 justify-center px-4 py-20 h-full`}>
                    <OutfitBold style={tw`text-3xl text-center`}>Verify OTP</OutfitBold>
                    <OutfitSemibold style={tw`text-gray-500 text-center px-4`}>
                        Enter the 6-digit code sent to your email.
                    </OutfitSemibold>

                    <View style={tw`py-6 items-center`}>
                        <OtpInput
                            numberOfDigits={6}
                            focusColor="green"
                            autoFocus={false}
                            hideStick={true}
                            placeholder="******"
                            blurOnFilled={true}
                            disabled={false}
                            type="numeric"
                            secureTextEntry={false}
                            focusStickBlinkingDuration={500}
                            onFocus={() => console.log("Focused")}
                            onBlur={() => console.log("Blurred")}
                            onTextChange={(text: any) => console.log(text)}
                            onFilled={(text: any) => console.log(`OTP is ${text}`)}
                            textInputProps={{
                                accessibilityLabel: "One-Time Password",
                            }}
                        />
                        {error && <OutfitText style={tw`text-red-500 mt-2`}>{error}</OutfitText>}
                    </View>

                    <View style={tw`flex-col gap-5`}>
                        <TouchableOpacity
                            onPress={handleVerifyOTP}
                            disabled={isLoading}
                            style={tw`p-4 font-semibold text-2xl ${isLoading ? "bg-[#c48647]/50" : "bg-[#c48647]"
                                } flex justify-center items-center rounded-2xl`}
                        >
                            <View style={tw`flex-row items-center`}>
                                {isLoading && <ActivityIndicator size="small" color="white" style={tw`mr-2`} />}
                                <OutfitText style={tw`text-white`}>
                                    {isLoading ? "Verifying..." : "Verify OTP"}
                                </OutfitText>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleResendOTP} disabled={isResending}>
                            <OutfitText style={tw`text-center text-blue-500`}>
                                {isResending ? "Resending OTP..." : "Resend OTP"}
                            </OutfitText>
                        </TouchableOpacity>

                        <OutfitText
                            style={tw`text-center text-blue-500 mt-4`}
                            onPress={() => router.push("/(auth)/sign-in")}
                        >
                            Back to Login
                        </OutfitText>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

export default VerifyOTP;

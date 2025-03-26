package io.easyware.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

public class EncryptionUtil {

    private static final String ALGORITHM = "AES";

    public static String encrypt(String value, UUID encryptionKey) throws Exception {
        String key = encryptionKey.toString().replace("-", "");
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.ENCRYPT_MODE, keySpec);

        byte[] encrypted = cipher.doFinal(value.getBytes(StandardCharsets.UTF_8));
        return Base64.getEncoder().encodeToString(encrypted);
    }

    public static String decrypt(String encryptedValue, UUID encryptionKey) throws Exception {
        String key = encryptionKey.toString().replace("-", "");
        SecretKeySpec keySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), ALGORITHM);
        Cipher cipher = Cipher.getInstance(ALGORITHM);
        cipher.init(Cipher.DECRYPT_MODE, keySpec);

        byte[] original = cipher.doFinal(Base64.getDecoder().decode(encryptedValue));
        return new String(original, StandardCharsets.UTF_8);
    }

}

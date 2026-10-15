package uceva.products.domain.exception;

/**
 * Se lanza cuando un parámetro de la solicitud no cumple las reglas de negocio (HTTP 400).
 */
public class InvalidRequestException extends RuntimeException {

    public InvalidRequestException(String message) {
        super(message);
    }
}

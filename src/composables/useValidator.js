export function useValidator() {
    const requiredTextValidator = (value) => {
       return !/^(<p>)(<\/p>)$/.test(value.trim())
    }
    const requiredText =
         {
            $validator: requiredTextValidator,
            $message: 'This field have to be filled'
        }
    
 
    return {requiredText}
}
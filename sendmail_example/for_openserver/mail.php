<?php
if(isset($_POST['email'])) {
    // Две необходимый строки
    $email_to = "roman.alexeychenko@gmail.com"; //Мейл от которого идет сообщение
    $email_subject = "SJ-PHOTOSTUDIO";//То что будет в шапке письма

    /**
     * выводим на экран пришчину ошибки
     * @param $error
     */
    function died($error) {
        // your error code can go here
        echo "Возникли ошибки, из-за которых отправка сообщения невозможна";
        echo "Ошибки ниже.<br /><br />";
        echo $error."<br /><br />";
        echo "Нажмите НАЗАД и исправьте ошибки.<br /><br />";
        die();
    }

    //Проверяем, все ли данные введены
    if(!isset($_POST['first_name']) ||
        !isset($_POST['last_name']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['comments'])) {
        died('Возникли ошибки в заполнении формы');
    }

    //идентифицируем переменные, получеными из html
    $first_name = $_POST['first_name']; // required
    $last_name = $_POST['last_name']; // required
    $email_from = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $comments = $_POST['comments']; // required
    $error_message = "ошибка в почте письмо";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

    //делаем проверки на корректность введенных пользователем данных
	if(!preg_match($email_exp,$email_from)) {$error_message .= 'Емейл адресс неверный.<br />';}
    $string_exp = "/^[A-Za-z .'-]+$/";
    if(!preg_match($string_exp,$first_name)) {$error_message .= 'Первое имя неверное.<br />';}
    if(!preg_match($string_exp,$last_name)) {$error_message .= 'Последнее имя неверное.<br />';}
    if(strlen($comments) < 2) {$error_message .= 'Комментарий должен быть длиннее 2х символов.<br />';}
    if(strlen($error_message) > 0) {died($error_message);}
    $email_message = "Детали формы ниже.\n\n";

    /**
     * обрезаем лишнее
     * @param $string - входящее значение для обработки
     * @return string - обработанное сообщение
     */
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }

    $email_message .= "First Name: ".clean_string($first_name)."\n";
    $email_message .= "Last Name: ".clean_string($last_name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Telephone: ".clean_string($telephone)."\n";
    $email_message .= "Comments: ".clean_string($comments)."\n";

// формируем html заголовки
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();

//непосредственная отправка письма
@mail($email_to, $email_subject, $email_message, $headers);

?>

<!-- Здесь пихаем html с успешной отправкой  -->

Письмо успешно отправлено

<?php
}
?>
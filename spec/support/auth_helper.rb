module AuthHelper
  def http_login
    user = 'brendanbenson'
    pw = 'Badushi255'
    request.env['HTTP_AUTHORIZATION'] = ActionController::HttpAuthentication::Basic.encode_credentials(user,pw)
  end
end
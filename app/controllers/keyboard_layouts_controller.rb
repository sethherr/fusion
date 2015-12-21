class KeyboardLayoutsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    redirect_to edit_keyboard_layout_url(1)
  end
  def show
    render :edit
  end
  def update
    layout = Layout.find(params[:id])
    Rails.logger.debug "layout: #{layout_params}"
    layout.update!(layout_params)
    render json: {}
  end

  private

  def key_params
    [:label, :code, :position]
  end

  def layer_params
    [:description, keys: [key_params]]
  end

  def layout_params
    permitted = [layers: [layer_params]]

    params.require(:layout).permit(permitted).tap do |whitelisted|
      whitelisted[:layers_attributes] = whitelisted.delete(:layers)
      whitelisted[:layers_attributes] = whitelisted[:layers_attributes].map do |l|
        l[:keys_attributes] = l.delete(:keys)
        l
      end
    end
  end
end

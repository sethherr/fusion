class KeyboardLayoutsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :find_layout, only: [:edit, :update]

  def index
    redirect_to new_keyboard_layout_url
  end

  def new
  end

  def edit
  end

  def show
    redirect_to edit_keyboard_layout_url
  end

  def create
    @layout.update!(layout_params)
    render json: @layout
  end

  def update
    Rails.logger.debug "layout: #{layout_params}"
    @layout.update!(layout_params)
    render json: @layout
  end

  private

  def find_layout
    @layout = Layout.find(params[:id])
  end

  def key_params
    [:label, :code, :position]
  end

  def layer_params
    [:description, keys: [key_params]]
  end

  def layout_params
    permitted = [layers: [layer_params]]
    pp permitted

    params.require(:layout).permit(permitted).tap do |whitelisted|
      whitelisted[:layers_attributes] = whitelisted.delete(:layers)
      whitelisted[:layers_attributes] = whitelisted[:layers_attributes].map do |l|
        l[:keys_attributes] = l.delete(:keys)
        l
      end
    end
  end
end

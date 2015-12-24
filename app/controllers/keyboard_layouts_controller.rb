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
    @layout = Layout.create!(layout_params)
    @layout.update!(layers_params)
    render json: @layout
  end

  def update
    @layout.layers.destroy_all
    @layout.update!(layout_params.merge(layers_params))
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

  def permitted_layout_params
    params.require(:layout)
      .permit(:description, :kind, :name, layers: layer_params)
  end

  def remapped_layer_key_params
    # rename `keys` to `keys_attributes` for correct assignment
    permitted_layout_params[:layers].map do |layer|
      layer[:keys_attributes] = layer.delete(:keys)
      layer
    end
  end

  def layout_params
    permitted_layout_params.except(:layers)
  end

  def layers_params
    # rename `layers` to `layers_attributes` for correct assignment
    { layers_attributes: remapped_layer_key_params }
  end
end

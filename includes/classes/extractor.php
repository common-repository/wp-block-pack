<?php
/**
 * @package WP Block Pack
 * 
 * Kill session if accessed directly
 */
if ( !defined('ABSPATH') ) {
	die;
}


/**
 * WP Block Pack Extractor Class
 */
final class WP_Block_Pack_Extractor
{

	/**
	 * Auto write css for each block called.
	 *
	 * @since 1.1.4
	 */
	public function blocks_css( $this_post ) {

		if ( has_blocks( get_the_ID() ) ) {

			if ( isset( $this_post->post_content ) ) {

				$blocks = parse_blocks( $this_post->post_content );
				// self::$page_blocks = $blocks;

				if ( ! is_array( $blocks ) || empty( $blocks ) ) {
					return;
				}

				$this->extract_block($blocks);
				
			}
		}
	}


	/**
	 * Call blocks_css for single content.
	 *
	 * @since 1.1.4
	 */
	public function blocks_single_css( $this_post ) {

		$this->blocks_css( $this_post );
	}


	/**
	 * Call blocks_css for multiple content.
	 *
	 * @since 1.1.4
	 */
	public function blocks_multi_css( $post ) {

		if( is_array($post) ){

			foreach ( (array) $post as $this_post ) {

				$this->blocks_css( $this_post );

			}

		}

	}


	/**
	 * Auto write css for reusable blocks.
	 *
	 * @since 1.1.4
	 */
	public function extract_block( $blocks ) {

		$dante = '';

		foreach ( $blocks as $block ) {

			if ( is_array( $block ) && $block['blockName'] ) {
				// Reusable
				if ( $block['blockName'] === 'core/block' ) {
					$ref = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

					if ( $ref ) {
						$content = get_post_field( 'post_content', $ref );
						$reusable_blocks = parse_blocks( $content );

						$this->extract_block( $reusable_blocks );
					}
				} 
				// Standard Block
				else {
					// Get CSS for the Block.
					$this->get_block_css( $block );

					// if ( isset( $css['desktop'] ) ) {
					// 	$desktop .= $css['desktop'];
					// }
					// $dante .= print_r( $block);
				}
			}
		}
		// echo $dante;
	}














	/**
	 * Auto write css for reusable blocks.
	 *
	 * @param array $blocks Blocks array.
	 * @since 1.1.4
	 */
	public function get_stylesheet( $blocks ) {

		$desktop = '';

		foreach ( $blocks as $i => $block ) {

			if ( is_array( $block ) ) {
				if ( 'core/block' === $block['blockName'] ) {
					$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

					if ( $id ) {
						$content = get_post_field( 'post_content', $id );

						$reusable_blocks = parse_blocks( $content );

						$this->get_stylesheet( $reusable_blocks );

					}
				} else {
					// Get CSS for the Block.
					$css = $this->get_block_css( $block );

					if ( isset( $css['desktop'] ) ) {
						$desktop .= $css['desktop'];
					}
				}
			}
		}

		echo $desktop;
	}


	/**
	 * Generates zeropad.
	 *
	 * @since 1.1.4
	 */
	public function dechex_digit($num) {
	   return (strlen($num) >= 2) ? $num : "0" . $num;
	}

	/**
	 * Generates CSS recurrsively.
	 *
	 * @param object $block The block object.
	 * @since 1.1.4
	 */
	public function get_block_css( $block ) {

        $block = ( array ) $block;

        $name = $block['blockName'];
        $css  = '';

        if( ! isset( $name ) ) {
            return;
        }

        if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
            $blockattr = $block['attrs'];
            if ( isset( $blockattr['id'] ) ) {
                $block_id = $blockattr['id'];
            }
        }

        switch ( $name ) {
            case 'wp-block-pack/section':
		        if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
		            $blockattr = $block['attrs'];

            		// Main Section
	                $css .= '#' . $block_id . '.wp-block-pack-section{' ;

		            if ( isset( $blockattr['backgroundType'] ) ) {
		                $bg_type = $blockattr['backgroundType'];
		                if ($bg_type == 'image') {
				            if ( isset( $blockattr['backgroundImgURL'] ) ) {
		                        $css .= 'background-image: url(' . $blockattr['backgroundImgURL'] . ');';
		                        // position, attachment, repeat, size
		                        $css .= 'background-position: ';
					            if ( isset( $blockattr['backgroundImgPos'] ) ) {
			                        $css .= $blockattr['backgroundImgPos'] ;
			                    } else {
			                        $css .= 'center';
			                    }
		                        $css .= ';';
		                        $css .= 'background-attachment: ';
					            if ( isset( $blockattr['backgroundImgAtt'] ) ) {
			                        $css .= $blockattr['backgroundImgAtt'] ;
			                    } else {
			                        $css .= 'scroll';
			                    }
		                        $css .= ';';
		                        $css .= 'background-repeat: ';
					            if ( isset( $blockattr['backgroundImgRep'] ) ) {
			                        $css .= $blockattr['backgroundImgRep'] ;
			                    } else {
			                        $css .= 'no-repeat';
			                    }
		                        $css .= ';';
		                        $css .= 'background-size: ';
					            if ( isset( $blockattr['backgroundImgSize'] ) ) {
			                        $css .= $blockattr['backgroundImgSize'] ;
			                    } else {
			                        $css .= 'cover';
			                    }
		                        $css .= ';';
				            }
		                }
		            } else {
						$css .= 'background-color: ';
						if ( isset( $blockattr['backgroundColor'] ) ) {
							$css .= $blockattr['backgroundColor'] ;
						} else {
							$css .= '#f7f8f9' ;
						}
						if ( isset( $blockattr['background1Transparancy'] ) ) {
							$css .= $this->dechex_digit( dechex( $blockattr['background1Transparancy'] * 255 / 100 ) ); // 2 digits
						}
						$css .= ';';
		            	
		            }

	                // Padding
	                if (isset( $blockattr['paddingTop'] ) ) {
	                    $css .= 'padding-top: '. $blockattr['paddingTop'] .'px;';
	                }
	                if (isset( $blockattr['paddingRight'] ) ) {
	                    $css .= 'padding-right: '. $blockattr['paddingRight'] .'px;';
	                }
	                if (isset( $blockattr['paddingBottom'] ) ) {
	                    $css .= 'padding-bottom: '. $blockattr['paddingBottom'] .'px;';
	                }
	                if (isset( $blockattr['paddingLeft'] ) ) {
	                    $css .= 'padding-left: '. $blockattr['paddingLeft'] .'px;';
	                }

	                // Margin
					if (isset( $blockattr['marginTop'] ) ) {
					    $css .= 'margin-top: '. $blockattr['marginTop'] .'px;';
					}
					if (isset( $blockattr['marginRight'] ) ) {
					    $css .= 'margin-right: '. $blockattr['marginRight'] .'px;';
					}
					if (isset( $blockattr['marginBottom'] ) ) {
					    $css .= 'margin-bottom: '. $blockattr['marginBottom'] .'px;';
					}
					if (isset( $blockattr['marginLeft'] ) ) {
					    $css .= 'margin-left: '. $blockattr['marginLeft'] .'px;';
					}

	                // Text Align
					if (isset( $blockattr['alignment'] ) ) {
					    $css .= 'text-align: '. $blockattr['alignment'] .';';
					}

	                // Border Radius
					if (isset( $blockattr['borderRadius'] ) ) {
					    $css .= 'border-radius: '. $blockattr['borderRadius'] .'px;';
					}

	                // Shadow
					if (!isset( $blockattr['isShadow'] ) ) {
					    $css .= 'box-shadow: ';
						if (isset( $blockattr['shadowX'] ) ) {
						    $css .= $blockattr['shadowX'];
						} else {
						    $css .= '0';
						}
						$css .= 'px ';
						if (isset( $blockattr['shadowY'] ) ) {
						    $css .= $blockattr['shadowY'];
						} else {
						    $css .= '1';
						}
						$css .= 'px ';
						if (isset( $blockattr['shadowBlur'] ) ) {
						    $css .= $blockattr['shadowBlur'];
						} else {
						    $css .= '5';
						}
						$css .= 'px ';
						if (isset( $blockattr['shadowWide'] ) ) {
						    $css .= $blockattr['shadowWide'];
						} else {
						    $css .= '0';
						}
						$css .= 'px ';
						if (isset( $blockattr['shadowColor'] ) ) {
						    $css .= $blockattr['shadowColor'];
						} else {
						    $css .= '#23282d';
						}
						if (isset( $blockattr['shadowOpacity'] ) ) {
						    $css .= $this->dechex_digit( dechex( $blockattr['shadowOpacity'] * 255 / 100 ) );
						} else {
						    $css .= '4c';
						}

					    $css .= ';';
					}

	                // Color
					if (isset( $blockattr['textColor'] ) ) {
					    $css .= 'color: '. $blockattr['textColor'] .';';
					}

	                // Border
					if (isset( $blockattr['borderStyle'] ) ) {
					    $css .= 'border-style: '. $blockattr['borderStyle'] .';';
						if (isset( $blockattr['borderWidth'] ) ) {
						    $css .= 'border-width: '. $blockattr['borderWidth'] .'px;';
						} else {
						    $css .= 'border-width: 1px;';
						}
						if (isset( $blockattr['borderColor'] ) ) {
						    $css .= 'border-color: '. $blockattr['borderColor'] .';';
						}
					}

	                $css .= '}' ;

                	// Sub Section, based on attributes
                	// .wp-block-pack-section a
	                if (isset( $blockattr['linkColor'] ) ) {
	                    $css .= '#'. $block_id .'.wp-block-pack-section a{color: '. $blockattr['linkColor'] .';}';
	                }
                	// .wp-block-pack-section a:hover
	                if (isset( $blockattr['linkHoverColor'] ) ) {
	                    $css .= '#'. $block_id .'.wp-block-pack-section a:hover{color: '. $blockattr['linkHoverColor'] .';}';
	                }

		            if ( isset( $blockattr['backgroundType'] ) ) {
		                $bg_type = $blockattr['backgroundType'];
		                if ($bg_type == 'gradient') {
							// .wp-block-pack-section-gradient-background-wrap
							$css .= '#'. $block_id .'.wp-block-pack-section .wp-block-pack-section-gradient-background-wrap{background-image: ';
							if ( isset( $blockattr['backgroundDirection'] ) ) {
							    $css .= 'radial-gradient(';
							    if ( isset( $blockattr['backgroundRadialShape'] ) || isset( $blockattr['backgroundRadialAt'] ) ) {
							        if ( isset( $blockattr['backgroundRadialShape'] ) ) {
							            $css .= 'circle ';
							        }
							        if ( isset( $blockattr['backgroundRadialAt'] ) ) {
							            $css .= 'at '. $blockattr['backgroundRadialAt'] ;
							        }
							        $css .= ', ';
							    }
							} else {
							    $css .= 'linear-gradient(';
							    if ( isset( $blockattr['backgroundAngle'] ) ) {
							        $css .= $blockattr['backgroundAngle'] .'deg, ';
							    } else {
							        $css .= 'to bottom right, ';
							    }
							}

							if ( isset( $blockattr['backgroundColor'] ) ) {
								$css .= $blockattr['backgroundColor'] ;
							} else {
								$css .= '#f7f8f9' ;
							}
							if ( isset( $blockattr['background1Transparancy'] ) ) {
								$css .= $this->dechex_digit( dechex( $blockattr['background1Transparancy'] * 255 / 100 ) ); // 2 digits
							}
							if ( isset( $blockattr['background1Position'] ) ) {
								$css .= ' '. $blockattr['background1Position']. '%' ;
							}
							$css .= ',';

							if ( isset( $blockattr['backgroundColor2'] ) ) {
								$css .= $blockattr['backgroundColor2'] ;
							} else {
								$css .= '#c7c8c9' ;
							}
							if ( isset( $blockattr['background2Transparancy'] ) ) {
								$css .= $this->dechex_digit( dechex( $blockattr['background2Transparancy'] * 255 / 100 ) ); // 2 digits
							}
							if ( isset( $blockattr['background2Position'] ) ) {
								$css .= ' '. $blockattr['background2Position']. '%' ;
							}
							$css .= ');';

							$css .= 'opacity: ';
							if ( isset( $blockattr['backgroundOpacity'] ) ) {
								$css .= ( $blockattr['backgroundOpacity'] / 100 ) ;
							} else {
								$css .= "1" ;
							}
							$css .= ';';

			                // Border Radius
							if (isset( $blockattr['borderRadius'] ) ) {
							    $css .= 'border-radius: '. $blockattr['borderRadius'] .'px;';
							}
							$css .= '} ';
		                } else if ($bg_type == 'image') {
							// .wp-block-pack-section .image-overlay
							if ( isset( $blockattr['backgroundOverlay'] ) ) {
							    $css .= '#'. $block_id .'.wp-block-pack-section .image-overlay{';
							    if ( $blockattr['backgroundOverlay'] == 'color') {
							        $css .= 'background-color:';
									if ( isset( $blockattr['backgroundColor'] ) ) {
										$css .= $blockattr['backgroundColor'] ;
									} else {
										$css .= '#f7f8f9' ;
									}
									if ( isset( $blockattr['background1Transparancy'] ) ) {
										$css .= $this->dechex_digit( dechex( $blockattr['background1Transparancy'] * 255 / 100 ) ); // 2 digits
									}
									$css .= ';';
							    }
							    if ( $blockattr['backgroundOverlay'] == 'gradient') {
							        $css .= 'background-image:';


									if ( isset( $blockattr['backgroundDirection'] ) ) {
									    $css .= 'radial-gradient(';
									    if ( isset( $blockattr['backgroundRadialShape'] ) || isset( $blockattr['backgroundRadialAt'] ) ) {
									        if ( isset( $blockattr['backgroundRadialShape'] ) ) {
									            $css .= 'circle ';
									        }
									        if ( isset( $blockattr['backgroundRadialAt'] ) ) {
									            $css .= 'at '. $blockattr['backgroundRadialAt'] ;
									        }
									        $css .= ', ';
									    }
									} else {
									    $css .= 'linear-gradient(';
									    if ( isset( $blockattr['backgroundAngle'] ) ) {
									        $css .= $blockattr['backgroundAngle'] .'deg, ';
									    } else {
									        $css .= 'to bottom right, ';
									    }
									}

									if ( isset( $blockattr['backgroundColor'] ) ) {
										$css .= $blockattr['backgroundColor'] ;
									} else {
										$css .= '#f7f8f9' ;
									}
									if ( isset( $blockattr['background1Transparancy'] ) ) {
										$css .= $this->dechex_digit( dechex( $blockattr['background1Transparancy'] * 255 / 100 ) ); // 2 digits
									}
									if ( isset( $blockattr['background1Position'] ) ) {
										$css .= ' '. $blockattr['background1Position']. '%' ;
									}
									$css .= ',';

									if ( isset( $blockattr['backgroundColor2'] ) ) {
										$css .= $blockattr['backgroundColor2'] ;
									} else {
										$css .= '#c7c8c9' ;
									}
									if ( isset( $blockattr['background2Transparancy'] ) ) {
										$css .= $this->dechex_digit( dechex( $blockattr['background2Transparancy'] * 255 / 100 ) ); // 2 digits
									}
									if ( isset( $blockattr['background2Position'] ) ) {
										$css .= ' '. $blockattr['background2Position']. '%' ;
									}
									$css .= ');';
							    }

				                // Border Radius
								if (isset( $blockattr['borderRadius'] ) ) {
								    $css .= 'border-radius: '. $blockattr['borderRadius'] .'px;';
								}
								$css .= '} ';
							}
		                } else if ($bg_type == 'video') {
                    		// .wp-block-pack-section-video-background-wrap
							$css .= '#'. $block_id .'.wp-block-pack-section .wp-block-pack-section-video-background-wrap{';
							// Opacity
							$css .= 'opacity: ';
							if ( isset( $blockattr['backgroundOpacity'] ) ) {
								$css .= ( $blockattr['backgroundOpacity'] / 100 ) ;
							} else {
								$css .= "1" ;
							}
							$css .= ';';
			                // Border Radius
							if (isset( $blockattr['borderRadius'] ) ) {
							    $css .= 'border-radius: '. $blockattr['borderRadius'] .'px;';
							}
							$css .= '} ';

                    		// .wp-block-pack-section-video-background-wrap .video-overlay
							if ( isset( $blockattr['backgroundOverlay'] ) ) {
								$css .= '.wp-block-pack-section-video-background-wrap .video-overlay{';
							    if ( $blockattr['backgroundOverlay'] == 'color') {
							        $css .= 'background-color:';
									if ( isset( $blockattr['backgroundColor'] ) ) {
										$css .= $blockattr['backgroundColor'] ;
									} else {
										$css .= '#f7f8f9' ;
									}
									if ( isset( $blockattr['background1Transparancy'] ) ) {
										$css .= $this->dechex_digit( dechex( $blockattr['background1Transparancy'] * 255 / 100 ) ); // 2 digits
									}
									$css .= ';';
							    }
							    if ( $blockattr['backgroundOverlay'] == 'gradient') {
							        $css .= 'background-image:';


									if ( isset( $blockattr['backgroundDirection'] ) ) {
									    $css .= 'radial-gradient(';
									    if ( isset( $blockattr['backgroundRadialShape'] ) || isset( $blockattr['backgroundRadialAt'] ) ) {
									        if ( isset( $blockattr['backgroundRadialShape'] ) ) {
									            $css .= 'circle ';
									        }
									        if ( isset( $blockattr['backgroundRadialAt'] ) ) {
									            $css .= 'at '. $blockattr['backgroundRadialAt'] ;
									        }
									        $css .= ', ';
									    }
									} else {
									    $css .= 'linear-gradient(';
									    if ( isset( $blockattr['backgroundAngle'] ) ) {
									        $css .= $blockattr['backgroundAngle'] .'deg, ';
									    } else {
									        $css .= 'to bottom right, ';
									    }
									}

									if ( isset( $blockattr['backgroundColor'] ) ) {
										$css .= $blockattr['backgroundColor'] ;
									} else {
										$css .= '#f7f8f9' ;
									}
									if ( isset( $blockattr['background1Transparancy'] ) ) {
										$css .= $this->dechex_digit( dechex( $blockattr['background1Transparancy'] * 255 / 100 ) ); // 2 digits
									}
									if ( isset( $blockattr['background1Position'] ) ) {
										$css .= ' '. $blockattr['background1Position']. '%' ;
									}
									$css .= ',';

									if ( isset( $blockattr['backgroundColor2'] ) ) {
										$css .= $blockattr['backgroundColor2'] ;
									} else {
										$css .= '#c7c8c9' ;
									}
									if ( isset( $blockattr['background2Transparancy'] ) ) {
										$css .= $this->dechex_digit( dechex( $blockattr['background2Transparancy'] * 255 / 100 ) ); // 2 digits
									}
									if ( isset( $blockattr['background2Position'] ) ) {
										$css .= ' '. $blockattr['background2Position']. '%' ;
									}
									$css .= ');';
							    }

				                // Border Radius
								if (isset( $blockattr['borderRadius'] ) ) {
								    $css .= 'border-radius: '. $blockattr['borderRadius'] .'px;';
								}
								$css .= '} ';
							}
                		}
		            }


                	// .wp-block-pack-section-content-wrap
	                if (isset( $blockattr['contentWidth'] ) && isset( $blockattr['contentCustom'] ) ) {
		                if ( $blockattr['contentWidth'] == 'custom') {
		                    $css .= '#'. $block_id .'.wp-block-pack-section .wp-block-pack-section-content-wrap{max-width: '. $blockattr['contentCustom'] .'px;}';
		                }
	                }

	                
		        }
                break;


            default:
                // Nothing to do here.
                break;
        }

        if ( isset( $block['innerBlocks'] ) ) {
            foreach ( $block['innerBlocks'] as $j => $inner_block ) {
                if ( 'core/block' == $inner_block['blockName'] ) {
                    $id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

                    if ( $id ) {
                        $content = get_post_field( 'post_content', $id );

                        $reusable_blocks = parse_blocks( $content );

                        $this->get_stylesheet( $reusable_blocks );
                    }
                } else {
                	// Get CSS for the Block.
                    $inner_block_css = $this->get_block_css( $inner_block );

                    $css_desktop = ( isset( $css['desktop'] ) ? $css['desktop'] : '' );

                    if( isset( $inner_block_css['desktop'] ) ){
                        $css['desktop'] = $css_desktop . $inner_block_css['desktop'];
                    }
                }
            }
        }

        echo $css;
	}


}